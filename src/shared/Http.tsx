import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { closeToast, showLoadingToast } from 'vant'

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

http.instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    console.log(config, '🍋')
    if (config._autoLoading === true) {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

http.instance.interceptors.response.use(
  (response) => {
    console.log(response, '🍎')
    if (response.config._autoLoading === true) {
      closeToast()
    }
    return response
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.config._autoLoading === true) {
      closeToast()
    }
    if (error.response?.status === 429) {
      alert('你太频繁了')
    }
    return Promise.reject(error)
  }
)
