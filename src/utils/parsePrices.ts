import type { Price } from '@src/types/price'

export function parsePrices(data: Price[]): { prices: number[]; times: string[] } {
  const prices: number[] = []
  const times: string[] = []

  data.forEach((p) => {
    prices.push(p.price)
    times.push(p.time)
  })

  return { prices, times }
}
