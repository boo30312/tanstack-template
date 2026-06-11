import { createFileRoute } from '@tanstack/react-router'
import { LeadsSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/leads')({
  component: LeadsSectionPage,
})

function LeadsSectionPage() {
  return <LeadsSection />
}
