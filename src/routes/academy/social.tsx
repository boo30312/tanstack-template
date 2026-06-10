import { createFileRoute } from '@tanstack/react-router'
import { SocialContentSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/social')({
  component: SocialContentSectionPage,
})

function SocialContentSectionPage() {
  return <SocialContentSection />
}
