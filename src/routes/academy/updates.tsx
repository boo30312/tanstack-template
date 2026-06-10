import { createFileRoute } from '@tanstack/react-router'
import { UpdatesPage } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/updates')({
  component: UpdatesPageComponent,
})

function UpdatesPageComponent() {
  return <UpdatesPage />
}
