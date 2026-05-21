import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@app/layouts/RootLayout'

const DashboardPage = lazy(() => import('@app/routes/dashboard').then(m => ({ default: m.DashboardPage })))
const AboutPage = lazy(() => import('@app/routes/about').then(m => ({ default: m.AboutPage })))

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Suspense fallback={null}><DashboardPage /></Suspense> },
      { path: '/about', element: <Suspense fallback={null}><AboutPage /></Suspense> },
      { path: '*', element: <Navigate to="/" replace />}
    ],
  },
])
