import axios, { AxiosRequestConfig } from "axios";
import {
  OkResponse,
  CreatedResponse,
  BadRequestResponse,
  NotFoundResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from "../types/responses.types";

export async function getRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<
  | OkResponse<T>
  | BadRequestResponse
  | NotFoundResponse
  | InternalServerErrorResponse
  | UnauthorizedResponse
> {
  try {
    const response = await axios.get<OkResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    return transformErrorResponse(error);
  }
}

export async function postRequest<T, U>(
  url: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<
  | OkResponse<T>
  | CreatedResponse<T>
  | BadRequestResponse
  | InternalServerErrorResponse
  | UnauthorizedResponse
  | NotFoundResponse
> {
  try {
    const response = await axios.post<OkResponse<T> | CreatedResponse<T>>(url, data, config);
    return response.data;
  } catch (error: any) {
    return transformErrorResponse(error, data);
  }
}

export async function putRequest<T, U>(
  url: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<
  | OkResponse<T>
  | BadRequestResponse
  | InternalServerErrorResponse
  | UnauthorizedResponse
  | NotFoundResponse
> {
  try {
    const response = await axios.put<OkResponse<T>>(url, data, config);
    return response.data;
  } catch (error: any) {
    return transformErrorResponse(error, data);
  }
}

export async function deleteRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<
  | OkResponse<T>
  | BadRequestResponse
  | InternalServerErrorResponse
  | UnauthorizedResponse
  | NotFoundResponse
> {
  try {
    const response = await axios.delete<OkResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    return transformErrorResponse(error);
  }
}

function transformErrorResponse(
  error: any,
  requestData?: any
): BadRequestResponse | NotFoundResponse | InternalServerErrorResponse | UnauthorizedResponse {
  const status = error.response?.status || 500;
  const message = error.response?.data?.message || "An unexpected error occurred";
  const errorData = error.response?.data?.error || "Unknown error";

  return {
    status,
    error: errorData,
    message,
    ...(requestData && { requestData }), // Include request data if provided
  };
}
