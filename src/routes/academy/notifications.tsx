import { createFileRoute } from '@tanstack/react-router'
import { NotificationsSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/notifications')({
  component: NotificationsSectionPage,
})

function NotificationsSectionPage() {
  return <NotificationsSection />
}
