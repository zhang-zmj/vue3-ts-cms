import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface ZMJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface ZMJRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: ZMJRequestInterceptors<T>
  showLoading?: boolean
}
