import type { Price } from '@src/types/price'

export function parsePrices(data: Price[]): { prices: number[]; times: string[] } {
  const prices: number[] = []
  const times: string[] = []

  data.forEach((p) => {
    prices.push(p.avgPrice / 1000)
    const [year, month, day] = p.day.split('T')[0].split('-')
    times.push(`${day}/${month}/${year}`)
  })

  return { prices, times }
}
