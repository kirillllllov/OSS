import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBuilding, getMeetings, deleteMeeting, getPremises, deletePremise } from '../api'
import type { Building, Meeting, Premise, Employee } from '../api'
import { Layout } from '../components/Layout'
import styles from './BuildingDetailPage.module.css'

type Tab = 'info' | 'premises' | 'meetings' | 'documents'

function formatDate(s?: string) {
  if (!s) return '—'
  try { return new Date(s).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
  catch { return s }
}

function formatDateTime(s?: string) {
  if (!s) return '—'
  try {
    const d = new Date(s)
    return `${d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
  } catch { return s }
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Черновик',
  active: 'Подготовка',
  voting: 'Идёт голосование',
  counting: 'Подсчёт голосов',
  completed: 'Завершено',
  archived: 'Архив',
}

const FORM_LABELS: Record<string, string> = {
  in_person: 'Очная',
  absentee: 'Заочная',
  mixed: 'Очно-заочная',
}

function getStageClass(status?: string) {
  if (!status) return ''
  if (status === 'voting' || status === 'counting') return styles.voting
  if (status === 'completed' || status === 'archived') return styles.done
  if (status === 'active') return styles.prep
  return ''
}

function IconEye() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
}

function IconDelete() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
}

function IconCalendar() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>
}

function IconSearch() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
}

function IconChevronDown() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
}

function IconChevron() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
}

function IconDownload() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
}

interface PageProps {
  employee: Employee
  onLogout: () => void
}

export function BuildingDetailPage({ employee, onLogout }: PageProps) {
  const { buildingId } = useParams<{ buildingId: string }>()
  const navigate = useNavigate()
  const [building, setBuilding] = useState<Building | null>(null)
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [premises, setPremises] = useState<Premise[]>([])
  const [loadingBuilding, setLoadingBuilding] = useState(true)
  const [loadingMeetings, setLoadingMeetings] = useState(false)
  const [loadingPremises, setLoadingPremises] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('info')
  const [stageFilter, setStageFilter] = useState('')
  const [premiseSearch, setPremiseSearch] = useState('')
  const [purposeFilter, setPurposeFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  useEffect(() => {
    if (!buildingId) return
    setLoadingBuilding(true)
    getBuilding(buildingId).then(setBuilding).catch(console.error).finally(() => setLoadingBuilding(false))
  }, [buildingId])

  useEffect(() => {
    if (activeTab !== 'meetings' || !buildingId) return
    setLoadingMeetings(true)
    getMeetings(buildingId).then(setMeetings).catch(console.error).finally(() => setLoadingMeetings(false))
  }, [activeTab, buildingId])

  useEffect(() => {
    if (activeTab !== 'premises' || !buildingId) return
    setLoadingPremises(true)
    getPremises(buildingId).then(setPremises).catch(console.error).finally(() => setLoadingPremises(false))
  }, [activeTab, buildingId])

  const handleDeleteMeeting = async (e: React.MouseEvent, meetingId: string) => {
    e.stopPropagation()
    if (!confirm('Удалить собрание?')) return
    try {
      await deleteMeeting(meetingId)
      setMeetings((prev) => prev.filter((m) => m.id !== meetingId))
    } catch (err) {
      alert('Ошибка: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const handleDeletePremise = async (e: React.MouseEvent, premiseId: string) => {
    e.stopPropagation()
    if (!confirm('Удалить помещение?')) return
    try {
      await deletePremise(premiseId)
      setPremises((prev) => prev.filter((p) => p.id !== premiseId))
    } catch (err) {
      alert('Ошибка: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const RESIDENTIAL_TYPES = new Set([
    'Квартира', 'Комната', 'Жилой дом', 'Доля в квартире', 'Апартаменты',
  ])

  function getPremisePurpose(premiseType: string): string {
    return RESIDENTIAL_TYPES.has(premiseType) ? 'Жилое помещение' : 'Нежилое помещение'
  }

  const uniqueTypes = Array.from(new Set(premises.map((p) => p.premiseType).filter(Boolean))).sort()

  const filteredPremises = premises.filter((p) => {
    if (premiseSearch) {
      const q = premiseSearch.toLowerCase()
      const matchesSearch =
        (p.number ?? '').toLowerCase().includes(q) ||
        (p.cadastralNumber ?? '').toLowerCase().includes(q) ||
        (p.premiseType ?? '').toLowerCase().includes(q)
      if (!matchesSearch) return false
    }
    if (purposeFilter && getPremisePurpose(p.premiseType) !== purposeFilter) return false
    if (typeFilter && p.premiseType !== typeFilter) return false
    return true
  })

  const activeFiltersCount = [purposeFilter, typeFilter].filter(Boolean).length

  const breadcrumbs = [
    { label: 'Реестр домов', to: '/buildings' },
    { label: building ? building.address : `Дом #${buildingId}` },
  ]

  const filteredMeetings = meetings.filter((m) => {
    if (!stageFilter) return true
    const label = STATUS_LABELS[m.status || ''] || m.status || ''
    return label.toLowerCase().includes(stageFilter.toLowerCase())
  })

  return (
    <Layout employee={employee} onLogout={onLogout} breadcrumbs={breadcrumbs}>
      <div className={styles.page}>
        <div className={styles.tabs}>
          {([
            { key: 'info', label: 'ОБЩАЯ ИНФОРМАЦИЯ' },
            { key: 'premises', label: 'ПОМЕЩЕНИЯ' },
            { key: 'meetings', label: 'СОБРАНИЯ' },
            { key: 'documents', label: 'ДОКУМЕНТЫ' },
          ] as { key: Tab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.tab} ${activeTab === key ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── ОБЩАЯ ИНФОРМАЦИЯ ── */}
        {activeTab === 'info' && (
          <div className={styles.tabContent}>
            {loadingBuilding ? (
              <div className={styles.loading}><span className={styles.spinner} /> Загрузка...</div>
            ) : !building ? (
              <div className={styles.empty}>Дом не найден</div>
            ) : (
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <td className={styles.infoLabel}>Идентификатор</td>
                    <td className={styles.infoValue}>{building.id}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Дата добавления</td>
                    <td className={styles.infoValue}>{formatDateTime(building.createdAt)}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Дата последней проверки в Росреестре</td>
                    <td className={styles.infoValue}>—</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Адрес</td>
                    <td className={styles.infoValue}>{building.address}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Кадастровый номер</td>
                    <td className={styles.infoValue}>{building.cadastralNumber || '—'}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Год постройки</td>
                    <td className={styles.infoValue}>{building.yearBuilt ?? '—'}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Этажей</td>
                    <td className={styles.infoValue}>{building.floors ?? '—'}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Подъездов</td>
                    <td className={styles.infoValue}>{building.entrances ?? '—'}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Общая площадь</td>
                    <td className={styles.infoValue}>{building.totalArea != null ? `${building.totalArea} м²` : '—'}</td>
                  </tr>
                  <tr>
                    <td className={styles.infoLabel}>Количество помещений</td>
                    <td className={styles.infoValue}>{building.totalPremises ?? '—'}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── ПОМЕЩЕНИЯ ── */}
        {activeTab === 'premises' && (
          <div className={styles.premisesWrap}>
            <div className={styles.premisesFilters}>
              <div className={styles.premisesSearchField}>
                <IconSearch />
                <input
                  className={styles.premisesSearchInput}
                  placeholder="Поиск"
                  value={premiseSearch}
                  onChange={(e) => setPremiseSearch(e.target.value)}
                />
              </div>

              <div className={styles.filterDropdownWrap}>
                <div
                  className={`${styles.premisesFilterBtn} ${purposeFilter ? styles.premisesFilterBtnActive : ''}`}
                  onClick={() => { setShowPurposeDropdown(v => !v); setShowTypeDropdown(false) }}
                >
                  <span>{purposeFilter || 'Назначение'}</span>
                  <IconChevron />
                </div>
                {showPurposeDropdown && (
                  <div className={styles.filterDropdown}>
                    <div
                      className={`${styles.filterDropdownItem} ${!purposeFilter ? styles.filterDropdownItemActive : ''}`}
                      onClick={() => { setPurposeFilter(''); setShowPurposeDropdown(false) }}
                    >
                      Все
                    </div>
                    {['Жилое помещение', 'Нежилое помещение'].map((opt) => (
                      <div
                        key={opt}
                        className={`${styles.filterDropdownItem} ${purposeFilter === opt ? styles.filterDropdownItemActive : ''}`}
                        onClick={() => { setPurposeFilter(opt); setShowPurposeDropdown(false) }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.filterDropdownWrap}>
                <div
                  className={`${styles.premisesFilterBtn} ${typeFilter ? styles.premisesFilterBtnActive : ''}`}
                  onClick={() => { setShowTypeDropdown(v => !v); setShowPurposeDropdown(false) }}
                >
                  <span>{typeFilter || 'Вид помещения'}</span>
                  <IconChevron />
                </div>
                {showTypeDropdown && (
                  <div className={styles.filterDropdown}>
                    <div
                      className={`${styles.filterDropdownItem} ${!typeFilter ? styles.filterDropdownItemActive : ''}`}
                      onClick={() => { setTypeFilter(''); setShowTypeDropdown(false) }}
                    >
                      Все
                    </div>
                    {uniqueTypes.map((opt) => (
                      <div
                        key={opt}
                        className={`${styles.filterDropdownItem} ${typeFilter === opt ? styles.filterDropdownItemActive : ''}`}
                        onClick={() => { setTypeFilter(opt); setShowTypeDropdown(false) }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.premisesFilterBtn}>
                <IconCalendar />
                <span>Дата добавления</span>
              </div>

              <button
                className={`${styles.allFiltersBtn} ${activeFiltersCount > 0 ? styles.allFiltersBtnActive : ''}`}
                onClick={() => { setPurposeFilter(''); setTypeFilter(''); setShowPurposeDropdown(false); setShowTypeDropdown(false) }}
              >
                {activeFiltersCount > 0 ? `СБРОСИТЬ (${activeFiltersCount})` : 'ВСЕ ФИЛЬТРЫ'}
                <IconChevron />
              </button>
            </div>

            <div className={styles.premisesActions}>
              <button className={styles.btnCreatePremise}>
                ДОБАВИТЬ ПОМЕЩЕНИЕ
              </button>
              <button className={styles.btnExport} title="Экспорт">
                <IconDownload />
              </button>
            </div>

            {loadingPremises ? (
              <div className={styles.loading}><span className={styles.spinner} /> Загрузка...</div>
            ) : (
              <div className={styles.premisesTableWrap}>
                <table className={styles.premisesTable}>
                  <thead>
                    <tr>
                      <th><input type="checkbox" className={styles.checkbox} /></th>
                      <th>Кадастровый номер</th>
                      <th>Номер помещения</th>
                      <th>Назначение</th>
                      <th>Вид помещения</th>
                      <th>Площадь</th>
                      <th>Этаж</th>
                      <th>Дата обновления</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPremises.length === 0 ? (
                      <tr>
                        <td colSpan={9}>
                          <div className={styles.empty}>
                            {premises.length === 0 ? 'Помещения не добавлены' : 'Ничего не найдено'}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredPremises.map((p) => (
                        <tr key={p.id}>
                          <td onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className={styles.checkbox} />
                          </td>
                          <td>{p.cadastralNumber || '—'}</td>
                          <td>{p.number}</td>
                          <td>{getPremisePurpose(p.premiseType)}</td>
                          <td>{p.premiseType}</td>
                          <td>{p.area != null ? `${p.area} м²` : '—'}</td>
                          <td>{p.floor != null ? p.floor : '—'}</td>
                          <td>{p.updatedAt ? formatDate(p.updatedAt) : '—'}</td>
                          <td>
                            <button
                              className={styles.btnDeletePremise}
                              onClick={(e) => handleDeletePremise(e, p.id)}
                              title="Удалить"
                            >
                              <IconDelete />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── СОБРАНИЯ ── */}
        {activeTab === 'meetings' && (
          <div className={styles.tabContent} style={{ padding: '16px 20px' }}>
            <div className={styles.meetingFilters}>
              <div className={styles.filterField}>
                <IconCalendar />
                <input className={styles.filterInput} placeholder="Период проведения" readOnly />
              </div>
              <div className={styles.filterField}>
                <IconSearch />
                <input
                  className={styles.filterInput}
                  placeholder="Стадия"
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                />
              </div>
              <div className={styles.filterField}>
                <IconCalendar />
                <input className={styles.filterInput} placeholder="Дата обновления" readOnly />
              </div>
              <div className={styles.sortSelect}>
                <select>
                  <option>Сортировка</option>
                  <option>По дате (новые)</option>
                  <option>По дате (старые)</option>
                </select>
                <IconChevronDown />
              </div>
            </div>

            <div className={styles.meetingsHeader}>
              <button
                className={styles.btnCreate}
                onClick={() => navigate(`/buildings/${buildingId}/meetings/new`)}
              >
                СОЗДАТЬ СОБРАНИЕ
              </button>
            </div>

            {loadingMeetings ? (
              <div className={styles.loading}><span className={styles.spinner} /> Загрузка...</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th><input type="checkbox" className={styles.checkbox} /></th>
                    <th>Адрес</th>
                    <th>Период проведения</th>
                    <th>Номер</th>
                    <th>Форма</th>
                    <th>Стадия</th>
                    <th>Дата создания</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeetings.length === 0 ? (
                    <tr>
                      <td colSpan={8}>
                        <div className={styles.empty}>
                          {meetings.length === 0 ? 'Собрания не найдены' : 'Нет результатов'}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredMeetings.map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => navigate(`/buildings/${buildingId}/meetings/${m.id}`)}
                      >
                        <td onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className={styles.checkbox} />
                        </td>
                        <td>{building?.address || '—'}</td>
                        <td>
                          <div className={styles.dateRange}>
                            <span>{formatDate(m.startDate)}</span>
                            {m.endDate && <span>{formatDate(m.endDate)}</span>}
                          </div>
                        </td>
                        <td>{m.number || '—'}</td>
                        <td>{FORM_LABELS[m.form || ''] || m.form || '—'}</td>
                        <td>
                          <span className={`${styles.stageBadge} ${getStageClass(m.status)}`}>
                            {STATUS_LABELS[m.status || ''] || m.status || '—'}
                          </span>
                        </td>
                        <td>{formatDateTime(m.createdAt)}</td>
                        <td>
                          <div className={styles.actionBtns}>
                            <button
                              className={`${styles.actionBtn} ${styles.view}`}
                              onClick={(e) => { e.stopPropagation(); navigate(`/buildings/${buildingId}/meetings/${m.id}`) }}
                              title="Просмотр"
                            >
                              <IconEye />
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.del}`}
                              onClick={(e) => handleDeleteMeeting(e, m.id)}
                              title="Удалить"
                            >
                              <IconDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── ДОКУМЕНТЫ ── */}
        {activeTab === 'documents' && (
          <div className={styles.tabContent}>
            <div className={styles.empty}>Раздел «Документы» в разработке</div>
          </div>
        )}
      </div>
    </Layout>
  )
}
