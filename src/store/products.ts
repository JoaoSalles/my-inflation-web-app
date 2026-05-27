import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Product } from '../types/product'

interface ProductState {
  productMap: Record<string, string>
  setProducts: (products: Product[]) => void
}

export const useProductStore = create<ProductState>()(
  devtools((set) => ({
    productMap: {},
    setProducts: (products: Product[]) => set(
      {
        productMap: Object.fromEntries(products.map((p) => [p.name, p.quantityBase])),
      },
      false,
      "setProducts"
    ),
  }))
)

