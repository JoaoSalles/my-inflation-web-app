import { useQuery } from '@tanstack/react-query'
import { fetchPrices, type PricesParams } from '../api/prices'
import type { Price } from '../types/price'
import type { UseQueryResult } from '@tanstack/react-query'

export function usePrices(params?: PricesParams): UseQueryResult<Price[]> {
  return useQuery({
    queryKey: ['prices', params],
    queryFn: () => fetchPrices(params),
  })
}
