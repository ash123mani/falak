export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const d = date.getDate()
  const m = date.getMonth() + 1
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

export function formatDateLong(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
