import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function ReconciliationPage() {
  return <SectionPage section={getSection('/reconciliation')} />
}

export const Route = createFileRoute('/reconciliation')({
  component: ReconciliationPage,
})
