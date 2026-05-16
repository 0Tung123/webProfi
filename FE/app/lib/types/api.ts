export interface ApiResponse<T> {
  success: boolean
  data?: T | null
  error?: string
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}