import { createFileRoute } from '@tanstack/react-router'
import { InvoicesSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/invoices')({
  component: InvoicesSectionPage,
})

function InvoicesSectionPage() {
  return <InvoicesSection />
}
