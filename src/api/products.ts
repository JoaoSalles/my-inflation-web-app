import type { PaginatedResponse } from '@/types/paginated'
import type { Product } from '@/types/product'

export async function fetchProducts(): Promise<PaginatedResponse<Product>> {
  const response = await fetch('/api/product')
  if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`)
  return response.json() as Promise<PaginatedResponse<Product>>
}
