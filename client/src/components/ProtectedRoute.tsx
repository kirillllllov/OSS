import { Navigate } from 'react-router-dom'
import type { Employee } from '../api'

interface Props {
  employee: Employee | null
  children: React.ReactNode
}

export function ProtectedRoute({ employee, children }: Props) {
  if (!employee) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
