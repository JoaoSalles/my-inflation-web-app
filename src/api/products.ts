import type { PaginatedResponse } from '@src/types/paginated'
import type { Product } from '@src/types/product'

export async function fetchProducts(): Promise<PaginatedResponse<Product>> {
  const response = await fetch('/api/product')
  if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`)
  return response.json() as Promise<PaginatedResponse<Product>>
}
