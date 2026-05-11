import { useProducts } from '@src/hooks/useProducts'

interface ProductSelectProps {
  value: string
  onChange: (productName: string) => void
}

export function ProductSelect({ value, onChange }: ProductSelectProps) {
  const { data, isPending, error } = useProducts()

  if (isPending) return <select disabled><option>Loading…</option></select>
  if (error) return <select disabled><option>Error loading products</option></select>

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select a product</option>
      {data.data.map((product) => (
        <option key={product.productName} value={product.productName}>
          {product.productName}
        </option>
      ))}
    </select>
  )
}
