import { useState, useEffect } from 'react'
import { getOwnersByBuilding } from '../api'
import type { Employee, OwnerWithPremises } from '../api'

export type InitiatorValue = {
  type: 'owner' | 'employee'
  ownerId?: string
  employeeId?: string
  displayName: string
}

interface Props {
  buildingId: string
  currentEmployee: Employee
  existingOwnerIds?: string[]
  hasEmployeeInitiator?: boolean
  onAdd: (initiator: InitiatorValue) => void
  onClose: () => void
}

export function AddInitiatorModal({
  buildingId,
  currentEmployee,
  existingOwnerIds = [],
  hasEmployeeInitiator = false,
  onAdd,
  onClose,
}: Props) {
  const [initiatorType, setInitiatorType] = useState<'owner' | 'employee'>(
    hasEmployeeInitiator ? 'owner' : 'owner'
  )
  const [owners, setOwners] = useState<OwnerWithPremises[]>([])
  const [selectedOwnerId, setSelectedOwnerId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getOwnersByBuilding(buildingId)
      .then(setOwners)
      .catch(() => setOwners([]))
      .finally(() => setLoading(false))
  }, [buildingId])

  const availableOwners = owners.filter(o => !existingOwnerIds.includes(o.id))

  const handleAdd = () => {
    if (initiatorType === 'employee') {
      onAdd({
        type: 'employee',
        employeeId: currentEmployee.id,
        displayName: currentEmployee.fullName || currentEmployee.email,
      })
    } else {
      if (!selectedOwnerId) return
      const owner = availableOwners.find(o => o.id === selectedOwnerId)
      if (!owner) return
      const premiseLabel = owner.premises.length > 0 ? `, кв. ${owner.premises[0].number}` : ''
      onAdd({
        type: 'owner',
        ownerId: selectedOwnerId,
        displayName: `${owner.fullName}${premiseLabel}`,
      })
    }
  }

  const canAdd = initiatorType === 'employee'
    ? !hasEmployeeInitiator
    : !!selectedOwnerId

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#fff', borderRadius: 4, width: 400, boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          background: '#1565c0', color: '#fff',
          padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Добавление инициатора</span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
          >×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 12px' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#757575', marginBottom: 6 }}>
              Тип инициатора
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={initiatorType}
                onChange={e => { setInitiatorType(e.target.value as 'owner' | 'employee'); setSelectedOwnerId('') }}
                style={{
                  width: '100%', border: 'none', borderBottom: '1px solid #1565c0',
                  outline: 'none', fontSize: 13, color: '#212121', padding: '6px 0',
                  background: 'transparent', appearance: 'none', cursor: 'pointer',
                }}
              >
                <option value="owner">Собственник дома</option>
                {!hasEmployeeInitiator && (
                  <option value="employee">Сотрудник компании (УК)</option>
                )}
              </select>
              <span style={{ position: 'absolute', right: 0, top: 6, pointerEvents: 'none', color: '#757575', fontSize: 12 }}>▼</span>
            </div>
          </div>

          {initiatorType === 'owner' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#757575', marginBottom: 6 }}>
                ФИО собственника или номер помещения
              </label>
              {loading ? (
                <div style={{ fontSize: 12, color: '#9e9e9e', padding: '6px 0' }}>Загрузка...</div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedOwnerId}
                    onChange={e => setSelectedOwnerId(e.target.value)}
                    style={{
                      width: '100%', border: 'none', borderBottom: '1px solid #e0e0e0',
                      outline: 'none', fontSize: 13, color: selectedOwnerId ? '#212121' : '#9e9e9e',
                      padding: '6px 0', background: 'transparent', appearance: 'none', cursor: 'pointer',
                    }}
                  >
                    <option value="">Выберите собственника</option>
                    {availableOwners.map(o => {
                      const premiseLabel = o.premises.length > 0 ? `, кв. ${o.premises.map(p => p.number).join(', ')}` : ''
                      return (
                        <option key={o.id} value={o.id}>
                          {o.fullName}{premiseLabel}
                        </option>
                      )
                    })}
                  </select>
                  <span style={{ position: 'absolute', right: 0, top: 6, pointerEvents: 'none', color: '#757575', fontSize: 12 }}>▼</span>
                </div>
              )}
              {!loading && availableOwners.length === 0 && (
                <div style={{ fontSize: 11, color: '#e57373', marginTop: 6 }}>
                  {owners.length === 0
                    ? 'В этом доме нет собственников'
                    : 'Все собственники уже добавлены как инициаторы'}
                </div>
              )}
            </div>
          )}

          {initiatorType === 'employee' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#757575', marginBottom: 6 }}>
                Сотрудник (управляющая компания)
              </label>
              <div style={{ fontSize: 13, color: '#212121', padding: '6px 0', borderBottom: '1px solid #e0e0e0' }}>
                {currentEmployee.fullName || currentEmployee.email}
              </div>
              {hasEmployeeInitiator && (
                <div style={{ fontSize: 11, color: '#e57373', marginTop: 6 }}>
                  Управляющая компания уже добавлена как инициатор
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px 16px', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px', background: '#fff', color: '#757575',
              border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 12,
              fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', textTransform: 'uppercase',
            }}
          >
            ОТМЕНА
          </button>
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            style={{
              padding: '8px 20px', background: canAdd ? '#1565c0' : '#bbdefb', color: '#fff',
              border: 'none', borderRadius: 4, fontSize: 12,
              fontWeight: 700, letterSpacing: '0.06em', cursor: canAdd ? 'pointer' : 'not-allowed',
              textTransform: 'uppercase',
            }}
          >
            ДОБАВИТЬ
          </button>
        </div>
      </div>
    </div>
  )
}
