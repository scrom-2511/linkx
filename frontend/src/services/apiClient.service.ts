import { BACKEND_URL_API } from "@/config/app.config";
import { BackendResponse } from "@/types";
import axios, { AxiosInstance } from "axios";

export class ApiClient {
  protected axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({});
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
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as BackendResponse<T>;
        if (data && !data.success) {
          return { success: false, error: data.error };
        }
      }
      return {
        success: false,
        error: { code: "", message: "There was some error from our side." },
      };
    }
  }
}
