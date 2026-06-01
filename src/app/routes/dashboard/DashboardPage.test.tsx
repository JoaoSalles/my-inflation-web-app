import { screen, fireEvent } from "@testing-library/react";
import { vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithPRoviders'
import DashboardPage from "./DashboardPage";

vi.mock('@/hooks/useProducts', () => ({
  useProducts: () => ({
    data: {
      data: [{ name: 'Arroz' }, { name: 'Feijão' }],
      hasNext: false,
      page: 1,
      pageSize: 10,
    },
    isPending: false,
    error: null,
  }),
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

vi.mock('@/components/productCombobox', () => ({
  ProductCombobox: ({ onChange }: { onChange: (v: string) => void }) => (
    <button onClick={() => onChange('Arroz')} data-testid="select-product">
      Selecione um produto
    </button>
  ),
}))

describe("Dashboard tests", () => {
  it("should render initial state", () => {
    renderWithProviders(<DashboardPage />);

    expect(
      screen.getByTestId("history-card-header")
    ).toHaveTextContent("Histórico de preços");

    expect(
      screen.getByTestId("initial-state-message")
    ).toHaveTextContent("Selecione um produto acima para ver o histórico de preços.");
  });

  it("should render chart after selecting a product", () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.queryByTestId("price-chart")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("select-product"));

    expect(screen.getByTestId("price-chart")).toBeInTheDocument();
    expect(
      screen.queryByTestId("initial-state-message")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("initial-state-message")).not.toBeInTheDocument();
  });
});
