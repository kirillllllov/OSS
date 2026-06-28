import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createMeeting } from '../api'
import type { Employee } from '../api'
import { Layout } from '../components/Layout'
import { AddInitiatorModal } from '../components/AddInitiatorModal'
import type { InitiatorValue } from '../components/AddInitiatorModal'

interface PageProps {
  employee: Employee
  onLogout: () => void
}

export function MeetingFormPage({ employee, onLogout }: PageProps) {
  const { buildingId } = useParams<{ buildingId: string }>()
  const navigate = useNavigate()

  const [form, setForm] = useState('')
  const [startDate, setStartDate] = useState(() => {
    const now = new Date()
    now.setSeconds(0, 0)
    return now.toISOString().slice(0, 16)
  })
  const [endDate, setEndDate] = useState('')
  const [inPersonAddress, setInPersonAddress] = useState('')
  const [ballotAcceptanceAddress, setBallotAcceptanceAddress] = useState('')
  const [noticeAddress, setNoticeAddress] = useState('')
  const [ownerInitiators, setOwnerInitiators] = useState<InitiatorValue[]>([])
  const [employeeInitiator, setEmployeeInitiator] = useState<InitiatorValue | null>(null)
  const [showInitiatorModal, setShowInitiatorModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const breadcrumbs = [
    { label: 'Реестр домов', to: '/buildings' },
    { label: `Дом #${buildingId}`, to: `/buildings/${buildingId}` },
    { label: 'Создать собрание' },
  ]

  const handleAddInitiator = (value: InitiatorValue) => {
    if (value.type === 'employee') {
      setEmployeeInitiator(value)
    } else {
      setOwnerInitiators(prev => {
        if (prev.some(o => o.ownerId === value.ownerId)) return prev
        return [...prev, value]
      })
    }
    setShowInitiatorModal(false)
  }

  const handleRemoveOwner = (ownerId: string) => {
    setOwnerInitiators(prev => prev.filter(o => o.ownerId !== ownerId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!buildingId) return
    if (!form) { setError('Укажите форму собрания'); return }
    setSaving(true)
    setError(null)
    try {
      const meeting = await createMeeting({
        buildingId,
        form,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        inPersonAddress: inPersonAddress || undefined,
        ballotAcceptanceAddress: ballotAcceptanceAddress || undefined,
        noticeAddress: noticeAddress || undefined,
        initiatorEmployeeId: employeeInitiator?.employeeId,
        ownerInitiatorIds: ownerInitiators.map(o => o.ownerId!).filter(Boolean),
      })
      navigate(`/buildings/${buildingId}/meetings/${meeting.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании')
    } finally {
      setSaving(false)
    }
  }

  const allInitiators = [
    ...ownerInitiators,
    ...(employeeInitiator ? [employeeInitiator] : []),
  ]

  return (
    <Layout employee={employee} onLogout={onLogout} breadcrumbs={breadcrumbs}>
      <div style={{ background: '#fff', padding: '24px 20px', maxWidth: 600 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: '#212121' }}>
          Создать собрание
        </h2>

        <form onSubmit={handleSubmit}>
          <FormField label="Форма собрания *">
            <select value={form} onChange={(e) => setForm(e.target.value)} style={inputStyle} required>
              <option value="">Выберите форму</option>
              <option value="in_person">Очная</option>
              <option value="absentee">Заочная</option>
              <option value="mixed">Очно-заочная</option>
            </select>
          </FormField>

          <FormField label="Дата и время начала">
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={inputStyle}
            />
          </FormField>

          <FormField label="Дата и время окончания приёма решений">
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={inputStyle}
            />
          </FormField>

          <FormField label="Адрес проведения очной части">
            <input
              value={inPersonAddress}
              onChange={(e) => setInPersonAddress(e.target.value)}
              placeholder="Адрес"
              style={inputStyle}
            />
          </FormField>

          <FormField label="Адрес приёма заполненных решений">
            <input
              value={ballotAcceptanceAddress}
              onChange={(e) => setBallotAcceptanceAddress(e.target.value)}
              placeholder="Адрес"
              style={inputStyle}
            />
          </FormField>

          <FormField label="Адрес для ознакомления с документами">
            <input
              value={noticeAddress}
              onChange={(e) => setNoticeAddress(e.target.value)}
              placeholder="Адрес"
              style={inputStyle}
            />
          </FormField>

          {/* Initiators section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 12, color: '#757575' }}>Инициаторы</label>
              <button
                type="button"
                onClick={() => setShowInitiatorModal(true)}
                style={{
                  background: 'none', border: 'none', color: '#1565c0',
                  fontSize: 12, cursor: 'pointer', padding: '2px 0',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Добавить
              </button>
            </div>

            {allInitiators.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {allInitiators.map((initiator, idx) => (
                  <div key={initiator.ownerId ?? initiator.employeeId ?? idx} style={{
                    border: '1px solid #e0e0e0', borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 12px',
                  }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#757575', marginBottom: 2 }}>
                        {initiator.type === 'owner' ? 'Собственник дома' : 'Сотрудник компании (УК)'}
                      </div>
                      <div style={{ fontSize: 13, color: '#212121' }}>{initiator.displayName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (initiator.type === 'employee') setEmployeeInitiator(null)
                        else if (initiator.ownerId) handleRemoveOwner(initiator.ownerId)
                      }}
                      style={{ background: 'none', border: 'none', color: '#9e9e9e', cursor: 'pointer', fontSize: 18 }}
                      title="Удалить инициатора"
                    >×</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 12, color: '#9e9e9e', borderBottom: '1px solid #e0e0e0', padding: '6px 0' }}>
                Не указан
              </div>
            )}
          </div>

          {error && (
            <div style={{ color: '#e53935', fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '9px 24px',
                background: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Создание...' : 'СОЗДАТЬ'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/buildings/${buildingId}`)}
              style={{
                padding: '9px 24px',
                background: '#fff',
                color: '#757575',
                border: '1px solid #e0e0e0',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              ОТМЕНА
            </button>
          </div>
        </form>
      </div>

      {showInitiatorModal && buildingId && (
        <AddInitiatorModal
          buildingId={buildingId}
          currentEmployee={employee}
          existingOwnerIds={ownerInitiators.map(o => o.ownerId!).filter(Boolean)}
          hasEmployeeInitiator={!!employeeInitiator}
          onAdd={handleAddInitiator}
          onClose={() => setShowInitiatorModal(false)}
        />
      )}
    </Layout>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
  borderBottom: '1px solid #e0e0e0',
  outline: 'none',
  fontSize: 13,
  color: '#212121',
  padding: '6px 0',
  background: 'transparent',
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 12, color: '#757575', marginBottom: 4 }}>
        {label}
      </label>
      {children}
    </div>
  )
}
