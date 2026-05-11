import { useState } from 'react'
import { usePrices } from '@src/hooks/usePrices'
import { Chart } from '@src/components/chart'
import { ProductSelect } from '@src/components/productSelect'
import { parsePrices } from '@src/utils/parsePrices'

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
        <div className="w-full max-w-[500px] max-h-[500px]">
          <Chart
            labels={chartInputs.times}
            datasets={[
              {
                data: chartInputs.prices,
                borderColor: 'rgb(168, 165, 6)',
                backgroundColor: 'rgba(198, 253, 0, 0.92)',
              },
            ]}
            title={selectedProduct}
          />
        </div>
      )}
    </>
  )
}
