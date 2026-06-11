import { createFileRoute } from '@tanstack/react-router'
import { ReportsSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/reports')({
  component: ReportsSectionPage,
})

function ReportsSectionPage() {
  return <ReportsSection />
}
