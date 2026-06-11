import { createFileRoute } from '@tanstack/react-router'
import { DashboardOverview } from '../../components/DashboardOverview'

export const Route = createFileRoute('/academy/')({
  component: DashboardOverviewPage,
})

function DashboardOverviewPage() {
  return <DashboardOverview />
}
