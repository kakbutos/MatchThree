import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  static instance: AxiosInstance;

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    HTTPTransport.instance = axios.create({
      withCredentials: true,
      baseURL: HTTPTransport.API_URL,
    });
  }

  post = <Data, Response>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) =>
    HTTPTransport.instance.post<Data, Response>(
      `${this.endpoint}${url}`,
      data,
      config
    );

  put = <Data, Response>(url: string, data?: Data) =>
    HTTPTransport.instance.put<Data, Response>(`${this.endpoint}${url}`, data);

  get = <Data, Response>(url: string, data?: Data) =>
    HTTPTransport.instance.get<Data, Response>(`${this.endpoint}${url}`, {
      data,
    });
}

export default HTTPTransport;
