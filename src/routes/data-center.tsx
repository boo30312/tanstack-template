import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function DataCenterPage() {
  return <SectionPage section={getSection('/data-center')} />
}

export const Route = createFileRoute('/data-center')({
  component: DataCenterPage,
})
