export interface PaginatedResponse<T> {
  data: T[]
  hasNext: boolean
  page: number
  pageSize: number
}
