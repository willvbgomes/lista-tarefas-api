type ErrorWithStatus = Error & {
  status?: number
}

export const setNewError = (message: string, status: number = 500) => {
  const error = new Error(message) as ErrorWithStatus
  error.status = status

  return error
}

export const handleError = (error: unknown) => {
  if (error instanceof Error && 'status' in error) {
    return {
      errorMessage: error.message,
      errorStatus: error.status as number,
    }
  }

  if (error instanceof Error) {
    return {
      errorMessage: error.message,
      errorStatus: 500,
    }
  }

  return {
    errorMessage: 'An unexpected error occurred.',
    errorStatus: 500,
  }
}
