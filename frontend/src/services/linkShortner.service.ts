import { ApiClient } from "./apiClient.service";

export interface ShortenResponse {
  shortened: string;
}

export class LinkShortner extends ApiClient {
  endpoint: string;

  constructor(inputUrl: string, endpoint: string) {
    super(inputUrl);
    this.endpoint = endpoint;
  }

  async shorten(): Promise<string | null> {
    const res = await this.backendCall<ShortenResponse>(this.endpoint);

    if (res.success && res.data) {
      return res.data.shortened;
    }

    return null;
  }
}
