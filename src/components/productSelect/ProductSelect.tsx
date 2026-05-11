import { useProducts } from '@src/hooks/useProducts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@src/components/ui/select'

interface ProductSelectProps {
  value: string
  onChange: (productName: string) => void
}

export function ProductSelect({ value, onChange }: ProductSelectProps) {
  const { data, isPending, error } = useProducts()

  if (isPending) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading…" />
        </SelectTrigger>
      </Select>
    )
  }

  if (error) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Error loading products" />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a product" />
      </SelectTrigger>
      <SelectContent>
        {data.data.map((product) => (
          <SelectItem key={product.productName} value={product.productName}>
            {product.productName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
