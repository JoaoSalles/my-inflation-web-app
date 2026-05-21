import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/api/products'
import type { PaginatedResponse } from '@/types/paginated'
import type { Product } from '@/types/product'
import type { UseQueryResult } from '@tanstack/react-query'

export function useProducts(): UseQueryResult<PaginatedResponse<Product>> {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retry: 6,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
  })
}
