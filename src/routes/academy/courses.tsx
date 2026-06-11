import { createFileRoute } from '@tanstack/react-router'
import { CoursesSection } from '../../components/SectionPages'

export const Route = createFileRoute('/academy/courses')({
  component: CoursesSectionPage,
})

function CoursesSectionPage() {
  return <CoursesSection />
}
