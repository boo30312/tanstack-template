import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function WhatsAppPage() {
  return <SectionPage section={getSection('/whatsapp')} />
}

export const Route = createFileRoute('/whatsapp')({
  component: WhatsAppPage,
})
