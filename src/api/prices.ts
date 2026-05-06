import type { Price } from '../types/price'

export interface PricesParams {
  from?: string
  to?: string
  page?: number
  pageSize?: number
}

export async function fetchPrices(params?: PricesParams): Promise<Price[]> {
  const query = new URLSearchParams()
  if (params?.from) query.set('from', params.from)
  if (params?.to) query.set('to', params.to)
  if (params?.page !== undefined) query.set('page', String(params.page))
  if (params?.pageSize !== undefined) query.set('pageSize', String(params.pageSize))

  const url = `http://localhost:8080/prices${query.size > 0 ? `?${query}` : ''}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch prices: ${response.status}`)
  return response.json() as Promise<Price[]>
}
