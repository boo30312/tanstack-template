import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AcademyLayout } from '../components/AcademyLayout'

export const Route = createFileRoute('/academy')({
  component: AcademyLayoutComponent,
})

function AcademyLayoutComponent() {
  return (
    <AcademyLayout>
      <Outlet />
    </AcademyLayout>
  )
}
