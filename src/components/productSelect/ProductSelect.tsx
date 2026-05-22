import { useEffect } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useProductStore } from '@/store/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { cn } from "@/lib/cn"

interface ProductSelectProps {
  value: string
  onChange: (productName: string) => void
  className: string | undefined
}

export function ProductSelect({ value, onChange, className }: ProductSelectProps) {
  const { data, isPending, error } = useProducts()
  const { setProducts } = useProductStore()

  useEffect(() => {
    if (data?.data) setProducts(data.data)
  }, [data, setProducts])

  if (isPending) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading…" />
        </SelectTrigger>
      </Select>
    )
  }

  if (error && !data) {
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
      <SelectTrigger className={cn("w-50 truncate mr-1", className)}>
          <SelectValue placeholder="Selecione um produto"/>
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