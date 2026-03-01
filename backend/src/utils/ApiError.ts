
export class ApiError extends Error {

  public statusCode: number
  public errors: string[]
  public success: boolean

  constructor(message: string, statusCode: number, errors: string[] = [], stack?: string) {
    super(message)
    this.statusCode = statusCode,
      this.errors = errors,
      this.success = false

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
