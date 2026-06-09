import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

function DashboardLayoutComponent() {
  const { user } = useAuth()

  if (!user) {
    throw redirect({ to: '/login' })
  }

  return <DashboardLayout />
}

export const Route = createFileRoute('/dashboard/__layout')({
  component: DashboardLayoutComponent,
  beforeLoad: ({ context, location }) => {
    // This can be used for additional auth checks
  },
})
