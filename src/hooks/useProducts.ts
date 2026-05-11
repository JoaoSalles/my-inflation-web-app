import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@src/api/products'
import type { PaginatedResponse } from '@src/types/paginated'
import type { Product } from '@src/types/product'
import type { UseQueryResult } from '@tanstack/react-query'

export function useProducts(): UseQueryResult<PaginatedResponse<Product>> {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}
