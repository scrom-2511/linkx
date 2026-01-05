import { BACKEND_URL_API } from "@/config/app.config";
import { BackendResponse, Result } from "@/types";
import axios, { AxiosInstance, AxiosError } from "axios";

export class ApiClient {
  protected axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create();
  }

  async backendCall<T>(
    endpoint: string,
    payload: object
  ): Promise<BackendResponse<T>> {
    try {
      const responseData = (
        await this.axiosClient.post<BackendResponse<T>>(
          `${BACKEND_URL_API}${endpoint}`,
          payload
        )
      ).data;

      if (responseData.success) {
        console.log(responseData.data)
        return {
          success: true,
          data: responseData.data as T,
        };
      }

      return {
        success: false,
        error: {
          code: responseData.error.code,
          message: responseData.error.message,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: { code: "asdf", message: "" },
      };
    }
  }
}
