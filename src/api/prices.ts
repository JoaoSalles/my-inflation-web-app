import type { Price } from '../types/price'
import type { PaginatedResponse } from '@src/types/paginated';

export interface PricesParams {
  product?: string
  from?: string
  to?: string
  page?: number
  pageSize?: number
}

export async function fetchPrices(params?: PricesParams): Promise<PaginatedResponse<Price>> {
  const query = new URLSearchParams()
  if (params?.product) query.set('product', params.product)
  if (params?.from) query.set('from', params.from)
  if (params?.to) query.set('to', params.to)
  if (params?.page !== undefined) query.set('page', String(params.page))
  if (params?.pageSize !== undefined) query.set('pageSize', String(params.pageSize))

  const url = `/api/product-prices${query.size > 0 ? `?${query}` : ''}`
  const response = await fetch(url)
  console.log("response");
  if (!response.ok) throw new Error(`Failed to fetch prices: ${response.status}`)
  return response.json() as Promise<PaginatedResponse<Price>>
}
