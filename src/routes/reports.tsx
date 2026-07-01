import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function ReportsPage() {
  return <SectionPage section={getSection('/reports')} />
}

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
})
