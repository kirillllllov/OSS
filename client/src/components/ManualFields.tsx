import { useState } from 'react'
import type { ManualFieldMeta } from '../types'
import styles from './ManualFields.module.css'

interface Props {
  fields: ManualFieldMeta[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

interface ListFieldProps {
  meta: ManualFieldMeta
  value: string
  onChange: (value: string) => void
}

function ListField({ meta, value, onChange }: ListFieldProps) {
  const items = value ? value.split('\n').filter((_, i, arr) => i < arr.length) : ['']

  const setItem = (index: number, text: string) => {
    const next = [...items]
    next[index] = text
    onChange(next.join('\n'))
  }

  const addItem = () => {
    onChange(value ? value + '\n' : '')
  }

  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index)
    onChange(next.join('\n'))
  }

  return (
    <div className={styles.listField}>
      {items.map((item, idx) => (
        <div key={idx} className={styles.listRow}>
          <span className={styles.listIndex}>{idx + 1}</span>
          <input
            className={styles.input}
            type="text"
            value={item}
            placeholder={meta.placeholder ?? 'Иванов И.И.'}
            onChange={(e) => setItem(idx, e.target.value)}
          />
          {items.length > 1 && (
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeItem(idx)}
              title="Удалить строку"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addItem}>
        + Добавить ФИО
      </button>
    </div>
  )
}

interface Person { ФИО: string; ПРЕДСТАВИТЕЛЬ: string; ЦЕЛЬ: string }

interface JsonPersonsProps {
  value: string
  onChange: (value: string) => void
}

function JsonPersonsField({ value, onChange }: JsonPersonsProps) {
  let initial: Person[] = []
  try { initial = JSON.parse(value) } catch { initial = [] }
  if (initial.length === 0) initial = [{ ФИО: '', ПРЕДСТАВИТЕЛЬ: '', ЦЕЛЬ: '' }]

  const [persons, setPersons] = useState<Person[]>(initial)

  const update = (next: Person[]) => {
    setPersons(next)
    onChange(JSON.stringify(next))
  }

  const setPerson = (idx: number, field: keyof Person, val: string) => {
    const next = persons.map((p, i) => i === idx ? { ...p, [field]: val } : p)
    update(next)
  }

  const addPerson = () => update([...persons, { ФИО: '', ПРЕДСТАВИТЕЛЬ: '', ЦЕЛЬ: '' }])
  const removePerson = (idx: number) => update(persons.filter((_, i) => i !== idx))

  return (
    <div className={styles.listField}>
      {persons.map((person, idx) => (
        <div key={idx} style={{ marginBottom: 10, padding: '10px 12px', background: '#f5f5f5', borderRadius: 6, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: '0.04em' }}>ЛИЦО {idx + 1}</span>
            {persons.length > 1 && (
              <button type="button" className={styles.removeBtn} onClick={() => removePerson(idx)} title="Удалить">✕</button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <input className={styles.input} placeholder="ФИО / наименование и ОГРН" value={person.ФИО} onChange={e => setPerson(idx, 'ФИО', e.target.value)} />
            <input className={styles.input} placeholder="ФИО представителя" value={person.ПРЕДСТАВИТЕЛЬ} onChange={e => setPerson(idx, 'ПРЕДСТАВИТЕЛЬ', e.target.value)} />
            <input className={styles.input} placeholder="Цель участия" value={person.ЦЕЛЬ} onChange={e => setPerson(idx, 'ЦЕЛЬ', e.target.value)} />
          </div>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addPerson}>+ Добавить лицо</button>
    </div>
  )
}

export function ManualFields({ fields, values, onChange }: Props) {
  if (fields.length === 0) return null

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.icon}>✏️</span>
        <span>Поля для ручного заполнения</span>
      </div>
      <div className={styles.fields}>
        {fields.map((field) => (
          <div key={field.key} className={styles.fieldGroup}>
            <label className={styles.label} htmlFor={`field-${field.key}`}>
              {field.label}
            </label>

            {field.type === 'textarea' && (
              <textarea
                id={`field-${field.key}`}
                className={styles.textarea}
                rows={3}
                placeholder={field.placeholder}
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            )}

            {field.type === 'text' && (
              <input
                id={`field-${field.key}`}
                className={styles.input}
                type="text"
                placeholder={field.placeholder}
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            )}

            {field.type === 'date' && (
              <input
                id={`field-${field.key}`}
                className={styles.input}
                type="date"
                value={values[field.key] ?? ''}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            )}

            {field.type === 'select' && (
              <select
                id={`field-${field.key}`}
                className={styles.select}
                value={values[field.key] ?? (field.options?.[0] ?? '')}
                onChange={(e) => onChange(field.key, e.target.value)}
              >
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'list' && (
              <ListField
                meta={field}
                value={values[field.key] ?? ''}
                onChange={(val) => onChange(field.key, val)}
              />
            )}

            {field.type === 'json-persons' && (
              <JsonPersonsField
                value={values[field.key] ?? '[]'}
                onChange={(val) => onChange(field.key, val)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
