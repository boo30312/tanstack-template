import { createFileRoute } from '@tanstack/react-router'
import { DailyDealsSection } from '../../components/SectionPages'

export const Route = createFileRoute('/academy/deals')({
  component: DailyDealsSectionPage,
})

function DailyDealsSectionPage() {
  return <DailyDealsSection />
}
