import { describe, expect, it } from 'vitest'
import { dateToInstant } from './dateToInstant'

describe('dateToInstant', () => {
  it('appends a midnight UTC time to a YYYY-MM-DD date', () => {
    expect(dateToInstant('2026-05-01')).toBe('2026-05-01T00:00:00Z')
  })
})
