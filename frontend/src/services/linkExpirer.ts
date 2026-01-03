import { ApiClient } from "./apiClient.service";

export interface ExpirerResponse {
  expired: string;
}

export class LinkExpirer extends ApiClient {
  endpoint: string;

  constructor(inputUrl: string, endpoint: string) {
    super(inputUrl);
    this.endpoint = endpoint;
  }

  async expirer(): Promise<string | null> {
    const res = await this.backendCall<ExpirerResponse>(this.endpoint);

    if (res.success && res.data) {
      return res.data.expired;
    }

    return null;
  }
}
