import HTTPTransport from './http-transport';
import HTTPTransportServer from './http-transport-server';

export class BaseApi {
  protected http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}

export class BaseServerApi {
  protected http: HTTPTransportServer;

  constructor(endpoint: string) {
    this.http = new HTTPTransportServer(endpoint);
  }
}
