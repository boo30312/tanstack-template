import { createFileRoute } from '@tanstack/react-router'
import { SettingsSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/settings')({
  component: SettingsSectionPage,
})

function SettingsSectionPage() {
  return <SettingsSection />
}
