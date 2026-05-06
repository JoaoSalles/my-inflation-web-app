import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@app/routes/home'
import { DashboardPage } from '@app/routes/dashboard'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/dashboard', element: <DashboardPage /> },
])
