import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function DocumentsPage() {
  return <SectionPage section={getSection('/documents')} />
}

export const Route = createFileRoute('/documents')({
  component: DocumentsPage,
})
