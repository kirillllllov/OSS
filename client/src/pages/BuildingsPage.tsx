import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBuildings, createBuilding } from '../api'
import type { Building } from '../api'
import styles from './BuildingsPage.module.css'

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
    </svg>
  )
}

function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
    </svg>
  )
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z"/>
    </svg>
  )
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch { return dateStr }
}

const emptyForm = {
  address: '',
  cadastralNumber: '',
  yearBuilt: '',
  floors: '',
  entrances: '',
  totalArea: '',
  totalPremises: '',
}

export function BuildingsPage() {
  const navigate = useNavigate()
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getBuildings()
      .then(setBuildings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = buildings.filter((b) => {
    if (!searchQuery) return true
    return b.address.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleRowClick = (b: Building) => {
    setSelectedId(b.id)
    navigate(`/buildings/${b.id}`)
  }

  const openModal = () => {
    setForm(emptyForm)
    setSaveError(null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSaveError(null)
  }

  const handleSave = async () => {
    if (!form.address.trim()) { setSaveError('Укажите адрес'); return }
    if (!form.cadastralNumber.trim()) { setSaveError('Укажите кадастровый номер'); return }
    if (!form.totalArea || isNaN(Number(form.totalArea))) { setSaveError('Укажите корректную общую площадь'); return }
    if (!form.totalPremises || isNaN(Number(form.totalPremises))) { setSaveError('Укажите количество помещений'); return }
    setSaving(true)
    setSaveError(null)
    try {
      const created = await createBuilding({
        address: form.address.trim(),
        cadastralNumber: form.cadastralNumber.trim(),
        yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : undefined,
        floors: form.floors ? Number(form.floors) : undefined,
        entrances: form.entrances ? Number(form.entrances) : undefined,
        totalArea: Number(form.totalArea),
        totalPremises: Number(form.totalPremises),
      })
      setBuildings(prev => [created, ...prev])
      closeModal()
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #e0e0e0', borderRadius: 4,
    padding: '7px 10px', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 12, color: '#757575', marginBottom: 4, display: 'block',
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>Реестр домов</div>

      <div className={styles.toolbar}>
        <div className={styles.searchField} style={{ maxWidth: 320, flex: 2 }}>
          <IconSearch />
          <input
            className={styles.searchInput}
            placeholder="Поиск по адресу"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterDate}>
          <IconCalendar />
          <span>Дата обновления</span>
        </div>

        <div className={styles.filterBadge}>
          <select>
            <option>По дате (сначала новые)</option>
            <option>По дате (сначала старые)</option>
            <option>По адресу (А—Я)</option>
          </select>
        </div>

        <button className={styles.allFiltersBtn}>
          <IconFilter />
          ВСЕ ФИЛЬТРЫ
          <IconChevron />
        </button>

        <button
          onClick={openModal}
          style={{
            marginLeft: 'auto',
            padding: '6px 16px',
            background: '#1565c0',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          + ДОБАВИТЬ ДОМ
        </button>
      </div>

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.loading}>
            <span className={styles.spinner} />
            Загрузка...
          </div>
        ) : error ? (
          <div className={styles.empty}>Ошибка загрузки: {error}</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" className={styles.checkbox} /></th>
                <th>Адрес</th>
                <th>Кадастровый номер</th>
                <th>Площадь</th>
                <th>Помещений</th>
                <th>Дата обновления</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className={styles.empty}>
                      {buildings.length === 0 ? 'Нет объектов в реестре' : 'Ничего не найдено'}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => handleRowClick(b)}
                    className={selectedId === b.id ? styles.selected : ''}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className={styles.checkboxCell}>
                        <input type="checkbox" className={styles.checkbox} />
                      </div>
                    </td>
                    <td>{b.address}</td>
                    <td>{b.cadastralNumber || '—'}</td>
                    <td>{b.totalArea != null ? `${b.totalArea} м²` : '—'}</td>
                    <td>{b.totalPremises ?? '—'}</td>
                    <td>{formatDate(b.updatedAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: '#fff', borderRadius: 8, width: 520, maxWidth: '95vw',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)', overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#212121' }}>Добавить дом</span>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#9e9e9e' }}>✕</button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Адрес <span style={{ color: '#e53935' }}>*</span></label>
                <input style={inputStyle} placeholder="Полный адрес дома" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}>Кадастровый номер <span style={{ color: '#e53935' }}>*</span></label>
                <input style={inputStyle} placeholder="00:00:000000:0" value={form.cadastralNumber} onChange={e => setForm(f => ({ ...f, cadastralNumber: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Год постройки</label>
                  <input style={inputStyle} type="number" placeholder="2005" value={form.yearBuilt} onChange={e => setForm(f => ({ ...f, yearBuilt: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Этажей</label>
                  <input style={inputStyle} type="number" placeholder="9" value={form.floors} onChange={e => setForm(f => ({ ...f, floors: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Подъездов</label>
                  <input style={inputStyle} type="number" placeholder="4" value={form.entrances} onChange={e => setForm(f => ({ ...f, entrances: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Общая площадь, м² <span style={{ color: '#e53935' }}>*</span></label>
                  <input style={inputStyle} type="number" step="0.01" placeholder="4500.00" value={form.totalArea} onChange={e => setForm(f => ({ ...f, totalArea: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Количество помещений <span style={{ color: '#e53935' }}>*</span></label>
                  <input style={inputStyle} type="number" placeholder="120" value={form.totalPremises} onChange={e => setForm(f => ({ ...f, totalPremises: e.target.value }))} />
                </div>
              </div>
              {saveError && (
                <div style={{ color: '#e53935', fontSize: 12, padding: '6px 10px', background: '#ffebee', borderRadius: 4 }}>
                  {saveError}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '12px 20px', borderTop: '1px solid #f0f0f0' }}>
              <button
                onClick={closeModal}
                style={{ padding: '7px 18px', background: '#fff', color: '#757575', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' }}
              >
                ОТМЕНА
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ padding: '7px 18px', background: '#1565c0', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, letterSpacing: '0.05em', textTransform: 'uppercase' }}
              >
                {saving ? 'СОХРАНЕНИЕ...' : 'СОХРАНИТЬ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
