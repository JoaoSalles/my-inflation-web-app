import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithPRoviders'
import DashboardPage from './DashboardPage'
import { fetchProducts } from '@/api/products'
import { fetchPrices } from '@/api/prices'
import { useProductStore } from '@/store/products'
import type { Product } from '@/types/product'
import type { Price } from '@/types/price'
import type { PaginatedResponse } from '@/types/paginated'

// Mock only the network boundary so the real ProductCombobox, hooks and
// React Query wiring run — the point of the error flow is that the "Tente
// novamente" button triggers a real refetch.
vi.mock('@/api/products')
vi.mock('@/api/prices')

vi.mock('react-chartjs-2', () => ({
  Line: () => <canvas data-testid="line-chart" />,
}))

const mockFetchProducts = vi.mocked(fetchProducts)
const mockFetchPrices = vi.mocked(fetchPrices)

const products: Product[] = [{ name: 'Arroz', quantityBase: 'GRAMS' }]

function paginate<T>(data: T[]): PaginatedResponse<T> {
  return { data, hasNext: false, page: 1, pageSize: data.length }
}

async function selectArroz(user: ReturnType<typeof userEvent.setup>) {
  await user.click(await screen.findByRole('combobox'))
  await user.click(await screen.findByRole('option', { name: 'Arroz' }))
}

describe('Dashboard error flow (real React Query)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useProductStore.setState({ productMap: {} })
    mockFetchProducts.mockResolvedValue(paginate(products))
  })

  it('shows the error message and a retry button when the price history fails to load', async () => {
    const user = userEvent.setup()
    mockFetchPrices.mockRejectedValue(new Error('Failed to fetch prices: 500'))

    renderWithProviders(<DashboardPage />)

    // No product selected yet -> empty state, no error.
    expect(screen.getByTestId('initial-state-message')).toBeInTheDocument()
    expect(
      screen.queryByText('Não foi possível carregar o histórico.')
    ).not.toBeInTheDocument()

    await selectArroz(user)

    // The failed fetch surfaces the error state with a retry affordance.
    expect(
      await screen.findByText('Não foi possível carregar o histórico.')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Tente novamente' })
    ).toBeInTheDocument()
    expect(screen.queryByTestId('price-chart')).not.toBeInTheDocument()
    expect(mockFetchPrices).toHaveBeenCalledWith({ product: 'Arroz' })
  })

  it('refetches and renders the chart when the retry button is clicked', async () => {
    const user = userEvent.setup()
    mockFetchPrices.mockRejectedValueOnce(new Error('Failed to fetch prices: 500'))
    const prices: Price[] = [
      { day: '2024-01-01T00:00:00', avgPrice: 5000, product: 'Arroz' },
      { day: '2024-01-02T00:00:00', avgPrice: 5200, product: 'Arroz' },
    ]
    mockFetchPrices.mockResolvedValueOnce(paginate(prices))

    renderWithProviders(<DashboardPage />)

    await selectArroz(user)

    const retry = await screen.findByRole('button', { name: 'Tente novamente' })
    await user.click(retry)

    // After a successful refetch the error clears and the chart renders.
    await waitFor(() =>
      expect(
        screen.queryByText('Não foi possível carregar o histórico.')
      ).not.toBeInTheDocument()
    )
    expect(await screen.findByTestId('price-chart')).toBeInTheDocument()
    expect(mockFetchPrices).toHaveBeenCalledTimes(2)
  })
})
