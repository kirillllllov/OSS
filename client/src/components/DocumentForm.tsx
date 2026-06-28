import { useState } from 'react'
import type { DocumentType } from '../types'
import type { Employee } from '../api'
import { DOCUMENT_TYPES, AUTO_PLACEHOLDERS, MANUAL_FIELDS } from '../constants'
import { generateDocument } from '../api'
import { AutoFields } from './AutoFields'
import { ManualFields } from './ManualFields'
import styles from './DocumentForm.module.css'

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

interface Props {
  employee: Employee
  onLogout: () => void
}
export function DocumentForm({ employee, onLogout }: Props) {
  const [activeType, setActiveType] = useState<DocumentType>('protocol')
  const [meetingId, setMeetingId] = useState('')
  const [ownerId, setOwnerId] = useState('')
  const [manualValues, setManualValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const meta = DOCUMENT_TYPES.find((d) => d.type === activeType)!
  const autoFields = AUTO_PLACEHOLDERS[activeType]
  const manualFields = MANUAL_FIELDS[activeType]

  const handleTypeChange = (type: DocumentType) => {
    setActiveType(type)
    setManualValues({})
    setError(null)
    setSuccess(null)
  }

  const handleFieldChange = (key: string, value: string) => {
    setManualValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleGenerate = async () => {
    setError(null)
    setSuccess(null)

    if (!meetingId.trim()) {
      setError('Укажите ID собрания')
      return
    }
    if (activeType === 'ballot' && !ownerId.trim()) {
      setError('Для бюллетеня необходимо указать ID собственника')
      return
    }

    setLoading(true)
    try {
      const { blob, filename } = await generateDocument({
        type: activeType,
        meetingId: meetingId.trim(),
        manualFields: manualValues,
        ownerId: activeType === 'ballot' ? ownerId.trim() : undefined,
      })
      downloadBlob(blob, filename)
      setSuccess(`Файл "${filename}" успешно скачан`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.appHeader}>
        <div className={styles.appHeaderInner}>
          <div>
            <div className={styles.appTitle}>
              <span className={styles.appIcon}>📋</span>
              <span>Генерация документов ОСС</span>
            </div>
            <p className={styles.appSubtitle}>
              Формирование отчётной документации по шаблонам
            </p>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>👤 {employee.fullName}</span>
            <button type="button" className={styles.btnLogout} onClick={onLogout}>
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Тип документа</div>
          {DOCUMENT_TYPES.map((doc) => (
            <button
              key={doc.type}
              type="button"
              className={`${styles.navItem} ${activeType === doc.type ? styles.navItemActive : ''}`}
              onClick={() => handleTypeChange(doc.type)}
            >
              <span className={styles.navIcon}>{docIcon(doc.type)}</span>
              <span className={styles.navLabel}>{doc.label}</span>
            </button>
          ))}
        </nav>

        <main className={styles.content}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {docIcon(activeType)} {meta.label}
            </h2>
            <p className={styles.formDesc}>{meta.description}</p>
          </div>

          <div className={styles.form}>
            <div className={styles.meetingSection}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="meetingId">
                  ID собрания <span className={styles.required}>*</span>
                </label>
                <input
                  id="meetingId"
                  className={styles.fieldInput}
                  type="text"
                  placeholder="Например: clx0abc12345"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                />
                <span className={styles.fieldHint}>
                  Идентификатор собрания из базы данных
                </span>
              </div>

              {activeType === 'ballot' && (
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="ownerId">
                    ID собственника <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="ownerId"
                    className={styles.fieldInput}
                    type="text"
                    placeholder="Например: clx0xyz98765"
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}
                  />
                  <span className={styles.fieldHint}>
                    Идентификатор собственника для формирования бюллетеня
                  </span>
                </div>
              )}
            </div>

            <AutoFields fields={autoFields} />

            <ManualFields
              fields={manualFields}
              values={manualValues}
              onChange={handleFieldChange}
            />

            {error && (
              <div className={styles.alert} data-type="error">
                <span>⚠️</span> {error}
              </div>
            )}

            {success && (
              <div className={styles.alert} data-type="success">
                <span>✅</span> {success}
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    Генерация...
                  </>
                ) : (
                  <>
                    <span>⬇️</span> Скачать .docx
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function docIcon(type: DocumentType): string {
  const icons: Record<DocumentType, string> = {
    act: '📄',
    registration_sheet: '📝',
    protocol: '📋',
    ballot: '🗳️',
    meeting_message: '📢',
    register_of_owners: '🏠',
    sheet_of_invited_persons: '👥',
    sheet_of_the_persons_present: '✅',
  }
  return icons[type] ?? '📄'
}
