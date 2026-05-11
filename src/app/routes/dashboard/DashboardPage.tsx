import { useState } from 'react'
import { usePrices } from '@src/hooks/usePrices'
import { Chart } from '@src/components/chart'
import { ProductSelect } from '@src/components/productSelect'
import { parsePrices } from '@src/utils/parsePrices'

function getCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export default function DashboardPage() {
  const [selectedProduct, setSelectedProduct] = useState('')

  const { data, isPending, error } = usePrices(
    selectedProduct ? { product: selectedProduct } : undefined
  )

  const chartInputs = data ? parsePrices(data.data) : null
  
  return (
    <>
      dashboard
      <ProductSelect value={selectedProduct} onChange={setSelectedProduct} />

      {selectedProduct && isPending && <p>Loading prices…</p>}
      {selectedProduct && error && <p>Error loading prices.</p>}

      {chartInputs && (
        <div className="w-full max-w-125 max-h-125">
          <Chart
            labels={chartInputs.times}
            datasets={[
              {
                data: chartInputs.prices,
                borderColor: getCssVar('--graph-line'),
                backgroundColor: getCssVar('--graph-point'),
              },
            ]}
            title={selectedProduct}
          />
        </div>
      )}
    </>
  )
}
