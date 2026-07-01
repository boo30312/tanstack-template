import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ConvexClientProvider } from '../convex'
import { AppShell } from '../components/platform/AppShell'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'منصة إدارة المستفيدين - تلفزيون سوريا',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <AppShell>
        <Outlet />
      </AppShell>
      <TanStackRouterDevtools />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
