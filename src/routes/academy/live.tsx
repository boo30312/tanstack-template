import { createFileRoute } from '@tanstack/react-router'
import { LiveSessionsSection } from '../../components/SectionPages'

export const Route = createFileRoute('/academy/live')({
  component: LiveSessionsSectionPage,
})

function LiveSessionsSectionPage() {
  return <LiveSessionsSection />
}
