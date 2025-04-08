export function ok<T>(data: T, message: string, status: number = 200) {
  return {
    status,
    data,
    message,
  };
}
export function created<T>(data: T, message: string, status: number = 201) {
  return {
    status,
    data,
    message,
  };
}
export function badRequest<T>(message: string, status: number = 400) {
  return {
    status,
    error: message,
    message,
  };
}
export function notFound<T>(message: string, status: number = 404) {
  return {
    status,
    error: message,
    message,
  };
}
export function internalServerError<T>(message: string, status: number = 500) {
  return {
    status,
    error: message,
    message,
  };
}
export function unauthorized<T>(message: string, status: number = 401) {
  return {
    status,
    error: message,
    message,
  };
}
