import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/api/products'
import type { PaginatedResponse } from '@/types/paginated'
import type { Product } from '@/types/product'
import type { UseQueryResult } from '@tanstack/react-query'

export function useProducts(): UseQueryResult<PaginatedResponse<Product>> {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retry: 2,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24
  })
}
