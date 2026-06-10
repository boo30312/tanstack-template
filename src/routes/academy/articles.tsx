import { createFileRoute } from '@tanstack/react-router'
import { ArticlesSection } from '../../components/SectionPages'

export const Route = createFileRoute('/academy/articles')({
  component: ArticlesSectionPage,
})

function ArticlesSectionPage() {
  return <ArticlesSection />
}
