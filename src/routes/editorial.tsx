import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function EditorialPage() {
  return <SectionPage section={getSection('/editorial')} />
}

export const Route = createFileRoute('/editorial')({
  component: EditorialPage,
})
