import { useState } from 'react'
import { login } from '../api'
import type { Employee } from '../api'
import styles from './LoginForm.module.css'

interface Props {
  onLogin: (employee: Employee) => void
}

export function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim()) { setError('Введите email'); return }
    if (!password) { setError('Введите пароль'); return }
    setLoading(true)
    try {
      const employee = await login(email.trim(), password)
      onLogin(employee)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🏠</span>
          <span className={styles.logoTitle}>НАШЕ СОБРАНИЕ</span>
        </div>
        <p className={styles.subtitle}>Войдите в систему для продолжения</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="example@company.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">Пароль</label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className={styles.error}>
              <span>⚠</span> {error}
            </div>
          )}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? (
              <><span className={styles.spinner} /> Вход...</>
            ) : 'ВОЙТИ'}
          </button>
        </form>
      </div>
    </div>
  )
}
