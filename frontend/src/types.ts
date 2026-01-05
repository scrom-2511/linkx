export type Result<T, E = unknown> =
  | { success: true; data: T }
  | { success: false; data?: E };

export interface ErrorMessage {
  errorMessage: string;
}

export interface BackendResponseError {
  code: string;
  message: string
}

export type BackendResponse<T> =
  | { success: true; data: T }
  | { success: false; error: BackendResponseError };
