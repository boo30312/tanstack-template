import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function TvAppearancesPage() {
  return <SectionPage section={getSection('/tv-appearances')} />
}

export const Route = createFileRoute('/tv-appearances')({
  component: TvAppearancesPage,
})
