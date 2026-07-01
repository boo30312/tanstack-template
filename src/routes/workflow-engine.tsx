import { createFileRoute } from '@tanstack/react-router'
import { SectionPage } from '../components/platform/SectionPage'
import { getSection } from '../components/platform/navigation'

function WorkflowEnginePage() {
  return <SectionPage section={getSection('/workflow-engine')} />
}

export const Route = createFileRoute('/workflow-engine')({
  component: WorkflowEnginePage,
})
