import { ApiClient } from "./apiClient.service";

export interface EncrypterResponse {
  encrypted: string;
}

export class LinkEncrypter extends ApiClient {
  endpoint: string;

  constructor(inputUrl: string, endpoint: string) {
    super(inputUrl);
    this.endpoint = endpoint;
  }

  async encrypter(): Promise<string | null> {
    const res = await this.backendCall<EncrypterResponse>(this.endpoint);

    if (res.success && res.data) {
      return res.data.encrypted;
    }

    return null;
  }
}
