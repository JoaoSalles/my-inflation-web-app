export function formatTime(instant: string): string {
  const [year, month, day] = instant.slice(0, 10).split('-')
  return `${day}/${month}/${year}`
}
