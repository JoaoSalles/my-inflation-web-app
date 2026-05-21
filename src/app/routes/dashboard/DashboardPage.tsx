import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { usePrices } from '@/hooks/usePrices'
import { Chart } from '@/components/chart'
import { ProductSelect } from '@/components/productSelect'
import { parsePrices } from '@/utils/parsePrices'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function getCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export default function DashboardPage() {
  const [selectedProduct, setSelectedProduct] = useState('')

  const { data, isFetching, error, refetch } = usePrices(
    selectedProduct ? { product: selectedProduct } : undefined
  )

  const chartInputs = data ? parsePrices(data.data) : null
  const isFirstLoad = isFetching && !data
  const isRefetching = isFetching && !!data

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col gap-md">
        <h1 className="mb-0" data-testid="history-card-header">
          Histórico de preços
        </h1>
        <div className="flex flex-col gap-xs">
          <span className="text-xs font-medium text-muted-foreground">Produto</span>
          <ProductSelect
            value={selectedProduct}
            onChange={setSelectedProduct}
            className="w-72"
          />
        </div>
      </div>

      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="w-full h-96 relative">
            {!selectedProduct && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-sm text-muted-foreground"
                data-testid="initial-state-message"
              >
                <TrendingUp size={32} strokeWidth={1.5} />
                <p className="text-sm">Selecione um produto acima para ver o histórico de preços.</p>
              </div>
            )}

            {isFirstLoad && (
              <Skeleton className="absolute inset-0 rounded-sm bg-border" />
            )}

            {selectedProduct && error && !isFetching && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-sm text-muted-foreground">
                <p className="text-sm">Não foi possível carregar o histórico.</p>
                <button
                  onClick={() => void refetch()}
                  className="text-xs text-foreground underline-offset-2 hover:underline"
                >
                  Tente novamente
                </button>
              </div>
            )}

            {chartInputs && (
              <div
                className="absolute inset-0 transition-opacity duration-200"
                style={{ opacity: isRefetching ? 0.5 : 1 }}
                data-testid="price-chart"
              >
                <Chart
                  labels={chartInputs.times}
                  datasets={[
                    {
                      data: chartInputs.prices,
                      borderColor: getCssVar('--graph-line'),
                      backgroundColor: 'rgba(147, 197, 253, 0.1)',
                      pointBackgroundColor: getCssVar('--graph-point'),
                      pointRadius: 3,
                      pointHoverRadius: 5,
                      fill: true,
                      tension: 0.3,
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
