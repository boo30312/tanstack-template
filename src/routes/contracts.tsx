import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function ContractsPage() {
  return <SectionPage section={getSection('/contracts')} />
}

export const Route = createFileRoute('/contracts')({
  component: ContractsPage,
})
