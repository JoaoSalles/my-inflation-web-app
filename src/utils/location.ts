export const Location = {
  PaoDeAcucar: 0,
  Carrefour: 1,
} as const

export type Location = (typeof Location)[keyof typeof Location]

const locationLabels: Record<Location, string> = {
  [Location.PaoDeAcucar]: 'Pão de Açucar',
  [Location.Carrefour]: 'Carrefour',
}

export function formatLocation(location: number): string {
  return locationLabels[location as Location] ?? String(location)
}
