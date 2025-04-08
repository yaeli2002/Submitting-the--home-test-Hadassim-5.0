export interface OkResponse<T> {
  status: 200; // Typically 200
  data: T;
  message: string;
}

export interface CreatedResponse<T> {
  status: 201; // Typically 201
  data: T;
  message: string;
}

export interface BadRequestResponse {
  status: 400; // Typically 400
  error: string;
  message: string;
}

export interface NotFoundResponse {
  status: 404; // Typically 404
  error: string;
  message: string;
}

export interface InternalServerErrorResponse {
  status: 500; // Typically 500
  error: string;
  message: string;
}

export interface UnauthorizedResponse {
  status: 401; // Typically 401
  error: string;
  message: string;
}
