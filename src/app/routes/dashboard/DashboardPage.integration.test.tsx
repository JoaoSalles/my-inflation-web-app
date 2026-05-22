import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithPRoviders'
import DashboardPage from "./DashboardPage";

const mockProductsResult = vi.hoisted(() => ({
  data: {
    data: [
      { productName: 'Arroz', quantityBase: 'GRAMS' },
      { productName: 'Feijão', quantityBase: 'GRAMS' },
    ],
    hasNext: false,
    page: 1,
    pageSize: 10,
  },
  isPending: false,
  error: null,
}))

vi.mock('@/hooks/useProducts', () => ({
  useProducts: () => mockProductsResult,
}))

vi.mock('@/hooks/usePrices', () => ({
  usePrices: (params?: { product?: string }) => ({
    data: params?.product
      ? {
          data: [
            { day: '2024-01-01T00:00:00', avgPrice: 5000, product: params.product },
            { day: '2024-01-02T00:00:00', avgPrice: 5200, product: params.product },
          ],
          hasNext: false,
          page: 1,
          pageSize: 10,
        }
      : undefined,
    isFetching: false,
    error: null,
  }),
}))

vi.mock('react-chartjs-2', () => ({
  Line: () => <canvas data-testid="line-chart" />,
}))

describe("Dashboard integration tests (real ProductSelect)", () => {
  it("should render chart after selecting a product from the dropdown", async () => {
    const user = userEvent.setup()
    renderWithProviders(<DashboardPage />)

    expect(screen.queryByTestId("price-chart")).not.toBeInTheDocument()

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Arroz' }))

    expect(screen.getByTestId("price-chart")).toBeInTheDocument()
    expect(screen.getByTestId("disclaimer-unit-message")).toHaveTextContent("Valor referente ao preço médio de 1 Kg do produto")
    expect(screen.queryByTestId("initial-state-message")).not.toBeInTheDocument()
  })
})
