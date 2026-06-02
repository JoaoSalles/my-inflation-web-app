export type QuantityBase = 'GRAMS' | 'MILLILITERS' | 'UNIT'

export interface ProductLog {
  name: string
  brand: string
  price: number
  quantityBase: QuantityBase
  location: number
  time?: string | null
  productLabel?: string | null
}
