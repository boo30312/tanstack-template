import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function SettingsPage() {
  return <SectionPage section={getSection('/settings')} />
}

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})
