import { createFileRoute } from '@tanstack/react-router'
import { AIAssistant } from '../../components/AIAssistant'

export const Route = createFileRoute('/academy/ai-assistant')({
  component: AIAssistantPage,
})

function AIAssistantPage() {
  return (
    <div className="h-screen">
      <AIAssistant />
    </div>
  )
}
