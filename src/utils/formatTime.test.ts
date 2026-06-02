import { describe, expect, it } from 'vitest'
import { formatTime } from './formatTime'

describe('formatTime', () => {
  it('formats an ISO instant as DD/MM/YYYY', () => {
    expect(formatTime('2026-06-02T13:35:03.164226Z')).toBe('02/06/2026')
  })

  it('formats a date-only instant', () => {
    expect(formatTime('2026-12-25T00:00:00Z')).toBe('25/12/2026')
  })
})
