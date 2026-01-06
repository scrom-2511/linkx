import { BackendResponse } from "@/types";
import { ApiClient } from "./apiClient.service";

export interface ExpirerResponse {
  expirerLink: string;
}

export interface ExpirerData {
  link: string;
  dateAndTime: Date;
}

export class LinkExpirer extends ApiClient {
  endpoint: string;

  constructor() {
    super();
    this.endpoint = "/expirerLink";
  }

  async expirer(data: ExpirerData): Promise<BackendResponse<ExpirerResponse>> {
    return await this.backendCall<ExpirerResponse>(this.endpoint, data);
  }
}
