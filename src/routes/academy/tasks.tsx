import { createFileRoute } from '@tanstack/react-router'
import { TasksSection } from '../../components/SectionPages'

export const Route = createFileRoute('/academy/tasks')({
  component: TasksSectionPage,
})

function TasksSectionPage() {
  return <TasksSection />
}
