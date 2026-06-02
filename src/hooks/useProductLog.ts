import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchProductLog, type ProductLogParams } from '@/api/productLog'
import type { ProductLog } from '@/types/productLog'
import type { PaginatedResponse } from '@/types/paginated'
import type { UseQueryResult } from '@tanstack/react-query'

export function useProductLog(
  params?: ProductLogParams
): UseQueryResult<PaginatedResponse<ProductLog>> {
  return useQuery({
    queryKey: ['productLog', params],
    queryFn: () => fetchProductLog(params),
    enabled: !!params?.product,
    placeholderData: keepPreviousData,
  })
}
