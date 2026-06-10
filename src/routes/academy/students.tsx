import { createFileRoute } from '@tanstack/react-router'
import { StudentsSection } from '../../components/SectionPages'

export const Route = createFileRoute('/academy/students')({
  component: StudentsSectionPage,
})

function StudentsSectionPage() {
  return <StudentsSection />
}
