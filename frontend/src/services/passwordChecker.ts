import { BackendResponse } from "@/types";
import { ApiClient } from "./apiClient.service";

export interface PasswordCheckerResponse {
  passwordCheckeredLink: string;
}

export interface PasswordCheckerData {
  encryptedLink: string;
  password: string;
}

export class PasswordChecker extends ApiClient {
  endpoint: string;

  constructor() {
    super();
    this.endpoint = "/passChecker";
  }

  async check(
    data: PasswordCheckerData
  ): Promise<BackendResponse<PasswordCheckerResponse>> {
    let res = await this.backendCall<PasswordCheckerResponse>(
      this.endpoint,
      data
    );
    return res;
  }
}
