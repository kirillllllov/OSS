import { Link, useLocation } from 'react-router-dom'
import type { Employee } from '../api'
import styles from './Layout.module.css'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  employee: Employee
  onLogout: () => void
  breadcrumbs?: BreadcrumbItem[]
  children: React.ReactNode
}

function IconBuildings() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h1v7c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-7h1c.41 0 .75-.34.75-.75s-.34-.75-.75-.75L12 2.5 3 12.25c-.41 0-.75.34-.75.75s.34.75.75.75zM13 19h-2v-3h2v3zm3 0h-2v-4c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v4H8v-7l4-4 4 4v7z"/>
    </svg>
  )
}

function IconMeetings() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  )
}

function IconDocuments() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  )
}

function IconHouse() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  )
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  )
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  )
}

export function Layout({ employee, onLogout, breadcrumbs, children }: Props) {
  const location = useLocation()

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <header className={styles.header}>
          <Link to="/buildings" className={styles.headerLogo}>
            <span className={styles.headerLogoIcon}>
              <IconHouse />
            </span>
            <span className={styles.headerLogoText}>НАШЕ СОБРАНИЕ</span>
          </Link>
          <div className={styles.headerSpacer} />
          <div className={styles.headerInfo}>
            <span className={styles.headerCompany}>
              {employee.fullName || employee.email}
              {employee.company?.name && ` / ${employee.company.name}`}
            </span>
            <button
              className={styles.headerUser}
              onClick={onLogout}
              title="Выйти"
            >
              <IconUser />
            </button>
          </div>
        </header>

        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumbs}>
            {breadcrumbs.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {i > 0 && <span className={styles.breadcrumbSep}>›</span>}
                {item.to ? (
                  <Link to={item.to} className={styles.breadcrumbLink}>{item.label}</Link>
                ) : (
                  <span className={styles.breadcrumbCurrent}>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
