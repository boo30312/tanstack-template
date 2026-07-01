import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function BeneficiariesPage() {
  return <SectionPage section={getSection('/beneficiaries')} />
}

export const Route = createFileRoute('/beneficiaries')({
  component: BeneficiariesPage,
})
