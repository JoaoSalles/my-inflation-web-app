import { screen, fireEvent } from "@testing-library/react"
import { vi } from 'vitest'
import { renderWithProviders } from '@/test/renderWithPRoviders'
import LogsPage from "./LogsPage"

vi.mock('@/hooks/useProductLog', () => ({
  useProductLog: (params?: { product?: string }) => ({
    data: params?.product
      ? {
          data: [
            {
              name: 'Arroz',
              brand: 'Tio João',
              price: 5000,
              quantityBase: 'GRAMS',
              location: 1,
              productLabel: null,
            },
          ],
          hasNext: false,
          page: 0,
          pageSize: 20,
        }
      : undefined,
    isFetching: false,
    error: null,
    refetch: vi.fn(),
  }),
}))

vi.mock('@/components/productCombobox', () => ({
  ProductCombobox: ({ onChange }: { onChange: (v: string) => void }) => (
    <button onClick={() => onChange('Arroz')} data-testid="select-product">
      Selecione um produto
    </button>
  ),
}))

describe("Logs page", () => {
  it("renders the initial empty state before a product is selected", () => {
    renderWithProviders(<LogsPage />)

    expect(screen.getByTestId("logs-card-header")).toHaveTextContent(
      "Registro de preços"
    )
    expect(screen.getByTestId("initial-state-message")).toBeInTheDocument()
    expect(screen.queryByTestId("logs-table")).not.toBeInTheDocument()
  })

  it("renders the data table with rows after selecting a product", () => {
    renderWithProviders(<LogsPage />)

    fireEvent.click(screen.getByTestId("select-product"))

    expect(screen.getByTestId("logs-table")).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Produto" })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Marca" })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Preço" })).toBeInTheDocument()
    expect(screen.getByText("Arroz")).toBeInTheDocument()
    expect(screen.getByText("Tio João")).toBeInTheDocument()
    expect(screen.getByText("R$ 5,00")).toBeInTheDocument()
    expect(screen.queryByTestId("initial-state-message")).not.toBeInTheDocument()
  })

  it("disables both pagination buttons when there is a single page", () => {
    renderWithProviders(<LogsPage />)
    fireEvent.click(screen.getByTestId("select-product"))

    expect(screen.getByTestId("prev-page")).toBeDisabled()
    expect(screen.getByTestId("next-page")).toBeDisabled()
  })
})
