import { BackendResponse } from "@/types";
import { ApiClient } from "./apiClient.service";

export interface ShortenResponse {
  shortenedLink: string;
}

export interface ShortenData {
  link: string;
}

export class LinkShortner extends ApiClient {
  endpoint: string;

  constructor() {
    super();
    this.endpoint = "/shortenLink";
  }

  async shorten(data: ShortenData): Promise<BackendResponse<ShortenResponse>> {
    return await this.backendCall<ShortenResponse>(this.endpoint, data);
  }
}
