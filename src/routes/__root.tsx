import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import React from 'react'
import { ConvexClientProvider } from '../convex'
import { AuthProvider, useAuth } from '../context/AuthContext'

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
        title: 'ENTER POINT - نظام لوحة التحكم',
      },
      {
        name: 'description',
        content: 'ENTER POINT Trading Academy - نظام إدارة الأكاديمية المتقدم',
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
      <Outlet />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <ConvexClientProvider>
          <AuthProvider>
            <AuthRedirect>
              {children}
            </AuthRedirect>
          </AuthProvider>
        </ConvexClientProvider>
        <Scripts />
      </body>
    </html>
  )
}

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user && !location.pathname.startsWith('/login') && location.pathname !== '/') {
      navigate({ to: '/login', replace: true })
    }
  }, [user, location.pathname, navigate])

  return <>{children}</>
}
