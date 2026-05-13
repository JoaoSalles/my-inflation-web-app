import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AboutPage } from '@app/routes/about'
import { DashboardPage } from '@app/routes/dashboard'
import { RootLayout } from '@app/layouts/RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '*', element: <Navigate to="/" replace />}
    ],
  },
])
