import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchProductLog } from './productLog'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchProductLog', () => {
  it('builds the /price/product-log URL with url-encoded query params', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [], page: 0, pageSize: 20, hasNext: false }),
    })
    vi.stubGlobal('fetch', mockFetch)

    await fetchProductLog({
      product: 'Café',
      from: '2026-05-01T00:00:00Z',
      to: '2026-05-31T00:00:00Z',
      page: 0,
      pageSize: 20,
    })

    const calledUrl = mockFetch.mock.calls[0][0] as string
    expect(calledUrl).toContain('/price/product-log?')
    expect(calledUrl).toContain('product=Caf%C3%A9')
    expect(calledUrl).toContain('from=2026-05-01T00%3A00%3A00Z')
    expect(calledUrl).toContain('to=2026-05-31T00%3A00%3A00Z')
    expect(calledUrl).toContain('page=0')
    expect(calledUrl).toContain('pageSize=20')
  })

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    await expect(fetchProductLog({ product: 'Arroz' })).rejects.toThrow(
      'Failed to fetch product log: 500'
    )
  })
})
