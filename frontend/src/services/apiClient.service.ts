import { Result } from "@/types";
import axios, { AxiosInstance } from "axios";

export class ApiClient {
  inputUrl: string;
  axiosClient: AxiosInstance;

  constructor(inputUrl: string) {
    this.inputUrl = inputUrl;
    this.axiosClient = axios.create();
  }

  async backendCall<T>(endpoint: string): Promise<Result<T>> {
    try {
      const response = await this.axiosClient.post(endpoint, {
        url: this.inputUrl,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
      };
    }
  }
}
