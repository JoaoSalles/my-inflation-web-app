import type { PaginatedResponse } from '@/types/paginated'
import type { ProductLog } from '@/types/productLog'

const apiUrl = import.meta.env.VITE_BACK_API_URL

export interface ProductLogParams {
  product?: string
  from?: string
  to?: string
  page?: number
  pageSize?: number
}

export async function fetchProductLog(
  params?: ProductLogParams
): Promise<PaginatedResponse<ProductLog>> {
  const query = new URLSearchParams()
  if (params?.product) query.set('product', params.product)
  if (params?.from) query.set('from', params.from)
  if (params?.to) query.set('to', params.to)
  if (params?.page !== undefined) query.set('page', String(params.page))
  if (params?.pageSize !== undefined) query.set('pageSize', String(params.pageSize))

  const url = `${apiUrl}/price/product-log${query.size > 0 ? `?${query}` : ''}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch product log: ${response.status}`)
  return response.json() as Promise<PaginatedResponse<ProductLog>>
}
