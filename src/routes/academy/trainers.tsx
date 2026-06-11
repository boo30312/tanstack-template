import { createFileRoute } from '@tanstack/react-router'
import { TrainersSection } from '../../components/PlaceholderPages'

export const Route = createFileRoute('/academy/trainers')({
  component: TrainersSectionPage,
})

function TrainersSectionPage() {
  return <TrainersSection />
}
