import { useQuery } from '@tanstack/react-query'
import { fetchPrices, type PricesParams } from '../api/prices'
import type { Price } from '../types/price'
import type { PaginatedResponse } from '@src/types/paginated';
import type { UseQueryResult } from '@tanstack/react-query'

export function usePrices(params?: PricesParams): UseQueryResult<PaginatedResponse<Price>> {
  return useQuery({
    queryKey: ['prices', params],
    queryFn: () => fetchPrices(params),
  })
}
