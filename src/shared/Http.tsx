import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

type GetConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'methods'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'methods'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
  }
}

export const http = new Http('/api/v1')
