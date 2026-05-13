import { useState } from 'react'
import { usePrices } from '@/hooks/usePrices'
import { Chart } from '@/components/chart'
import { ProductSelect } from '@/components/productSelect'
import { parsePrices } from '@/utils/parsePrices'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"


function getCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export default function DashboardPage() {
  const [selectedProduct, setSelectedProduct] = useState('')

  const { data, isFetching, error } = usePrices(
    selectedProduct ? { product: selectedProduct } : undefined
  )

  const chartInputs = data ? parsePrices(data.data) : null
  
  return (
    <>
      <Card
        className="w-full max-w-2xl mx-auto bg-primary-foreground flex flex-col"
      >
        <CardHeader data-testid="history-card-header">
          Historico por produto
        </CardHeader>
        <CardContent>
          <ProductSelect 
            value={selectedProduct}
            onChange={setSelectedProduct}
            className="w-full"
            data-testid="select-product"
          />


          <div className="w-full h-64 pt-md flex items-center justify-center">
            {!selectedProduct && (
              <p className="text-muted-foreground text-sm" data-testid="initial-state-message">Selecione um produto para ver seu historico.</p>
            )}
            {selectedProduct && isFetching && !data && <p className="text-muted-foreground text-sm">Carregando historico...</p>}
            {selectedProduct && error && <p className="text-muted-foreground text-sm">Error ao carregar historico.</p>}
            {chartInputs && (
              <div className="w-full h-full" data-testid="price-chart">
                <Chart
                  labels={chartInputs.times}
                  datasets={[
                    {
                      data: chartInputs.prices,
                      borderColor: getCssVar('--graph-line'),
                      backgroundColor: getCssVar('--graph-point'),
                      tension: 0.3,
                    },
                  ]}
                />
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </>
  )
}
