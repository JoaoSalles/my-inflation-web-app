import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats integer thousandths as Brazilian Real with comma decimals', () => {
    expect(formatPrice(5000)).toBe('R$ 5,00')
  })

  it('formats sub-unit values', () => {
    expect(formatPrice(1234)).toBe('R$ 1,23')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('R$ 0,00')
  })
})
