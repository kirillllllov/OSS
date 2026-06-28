import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import { Layout } from './components/Layout'
import { BuildingsPage } from './pages/BuildingsPage'
import { BuildingDetailPage } from './pages/BuildingDetailPage'
import { MeetingDetailPage } from './pages/MeetingDetailPage'
import { MeetingFormPage } from './pages/MeetingFormPage'
import { getMe, logout } from './api'
import type { Employee } from './api'

type AuthState = 'loading' | 'unauthenticated' | 'authenticated'

function App() {
  const [authState, setAuthState] = useState<AuthState>('loading')
  const [employee, setEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    getMe()
      .then((emp) => {
        if (emp) {
          setEmployee(emp)
          setAuthState('authenticated')
        } else {
          setAuthState('unauthenticated')
        }
      })
      .catch(() => setAuthState('unauthenticated'))
  }, [])

  const handleLogin = (emp: Employee) => {
    setEmployee(emp)
    setAuthState('authenticated')
  }

  const handleLogout = async () => {
    await logout()
    setEmployee(null)
    setAuthState('unauthenticated')
  }

  if (authState === 'loading') {
    return <LoadingScreen />
  }

  if (authState === 'unauthenticated') {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Navigate to="/buildings" replace />} />
        <Route path="/" element={<Navigate to="/buildings" replace />} />

        <Route
          path="/buildings"
          element={
            <Layout employee={employee!} onLogout={handleLogout} breadcrumbs={[{ label: 'Реестр домов' }]}>
              <BuildingsPage />
            </Layout>
          }
        />

        <Route
          path="/buildings/:buildingId"
          element={<BuildingDetailPage employee={employee!} onLogout={handleLogout} />}
        />

        <Route
          path="/buildings/:buildingId/meetings/new"
          element={<MeetingFormPage employee={employee!} onLogout={handleLogout} />}
        />

        <Route
          path="/buildings/:buildingId/meetings/:meetingId"
          element={<MeetingDetailPage employee={employee!} onLogout={handleLogout} />}
        />

        <Route
          path="/meetings"
          element={
            <Layout employee={employee!} onLogout={handleLogout} breadcrumbs={[{ label: 'Собрания' }]}>
              <div style={{ padding: 40, color: '#9e9e9e', textAlign: 'center', fontSize: 13 }}>
                Выберите дом в разделе «Реестр домов» для просмотра собраний
              </div>
            </Layout>
          }
        />

        <Route
          path="/documents"
          element={
            <Layout employee={employee!} onLogout={handleLogout} breadcrumbs={[{ label: 'Документы' }]}>
              <div style={{ padding: 40, color: '#9e9e9e', textAlign: 'center', fontSize: 13 }}>
                Выберите собрание для работы с документами
              </div>
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/buildings" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafafa',
      fontSize: '13px',
      color: '#9e9e9e',
      gap: '10px',
    }}>
      <span style={{
        width: '18px',
        height: '18px',
        border: '2px solid #e0e0e0',
        borderTopColor: '#4caf50',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spin 0.7s linear infinite',
      }} />
      Загрузка...
    </div>
  )
}

export default App
