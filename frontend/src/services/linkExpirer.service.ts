import { BackendResponse } from "@/types";
import { ApiClient } from "./apiClient.service";

export interface ExpirerResponse {
  expiredLink: string;
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
    console.log(data);
    return await this.backendCall<ExpirerResponse>(this.endpoint, data);
  }
}
