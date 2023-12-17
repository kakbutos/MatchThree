import HTTPTransport from './http-transport';

export class BaseApi {
  protected http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}
