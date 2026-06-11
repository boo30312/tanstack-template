import { createFileRoute } from '@tanstack/react-router'
import { PaymentsSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/payments')({
  component: PaymentsSectionPage,
})

function PaymentsSectionPage() {
  return <PaymentsSection />
}
