import { SERVER_API_URL } from '@/constants';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import HTTPTransport from './http-transport';

class HTTPTransportServer extends HTTPTransport {
  static instance: AxiosInstance;

  constructor(endpoint: string) {
    super(endpoint);
    HTTPTransportServer.instance = axios.create({
      baseURL: SERVER_API_URL,
    });
  }

  post = <Data, Response>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) =>
    HTTPTransportServer.instance.post<Data, Response>(
      `${this.endpoint}${url}`,
      data,
      config
    );

  get = <Data, Response>(url: string, data?: Data) =>
    HTTPTransportServer.instance.get<Data, Response>(`${this.endpoint}${url}`, {
      data,
    });
}

export default HTTPTransportServer;
