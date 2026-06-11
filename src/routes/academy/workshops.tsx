import { createFileRoute } from '@tanstack/react-router'
import { WorkshopsSection } from '../../components/SectionPages'

export const Route = createFileRoute('/academy/workshops')({
  component: WorkshopsSectionPage,
})

function WorkshopsSectionPage() {
  return <WorkshopsSection />
}
