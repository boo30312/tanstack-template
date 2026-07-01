import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function FinancePage() {
  return <SectionPage section={getSection('/finance')} />
}

export const Route = createFileRoute('/finance')({
  component: FinancePage,
})
