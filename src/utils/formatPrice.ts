export function formatPrice(price: number): string {
  return `R$ ${(price / 1000).toFixed(2).replace('.', ',')}`
}
