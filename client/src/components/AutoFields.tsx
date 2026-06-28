import type { AutoPlaceholder } from '../types'
import styles from './AutoFields.module.css'

interface Props {
  fields: AutoPlaceholder[]
}

export function AutoFields({ fields }: Props) {
  if (fields.length === 0) return null
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.icon}>⚙️</span>
        <span>Автозаполняемые данные</span>
        <span className={styles.badge}>из БД</span>
      </div>
      <div className={styles.note}>
        Значения подтягиваются из базы данных автоматически. Сейчас отображаются примеры.
      </div>
      <div className={styles.list}>
        {fields.map((f) => (
          <div key={f.key} className={styles.row}>
            <span className={styles.label}>{f.label}</span>
            <span className={styles.value}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
