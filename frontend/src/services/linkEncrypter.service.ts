import { BackendResponse } from "@/types";
import { ApiClient } from "./apiClient.service";

export interface EncrypterResponse {
  encryptedLink: string;
}

export interface EncrypterData {
  link: string;
  password: string;
}

export class LinkEncrypter extends ApiClient {
  endpoint: string;

  constructor() {
    super();
    this.endpoint = "/encryptLink";
  }

  async encrypt(
    data: EncrypterData
  ): Promise<BackendResponse<EncrypterResponse>> {
    return await this.backendCall<EncrypterResponse>(this.endpoint, data);
  }
}
