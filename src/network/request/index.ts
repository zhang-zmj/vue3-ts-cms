import axios from "axios"
import { AxiosInstance } from "axios"
import type { ZMJRequestInterceptors, ZMJRequestConfig } from "./type"
import { ElLoading } from "element-plus/lib/components/loading/index"
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading"

class ZMJRequest {
  instance: AxiosInstance
  interceptors?: ZMJRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: ZMJRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? false
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有的实例都有的拦截器：代码执行顺序和执行顺序有关
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有的实例都有的拦截器：请求拦截成功！！！")

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据",
            background: "rgba(0,0,0,0.5)"
          })
        }

        return config
      },
      (err) => {
        console.log("所有的实例都有的拦截器：请求拦截失败！！！")
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有的实例都有的拦截器：响应拦截成功！！！")

        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        if (res.data.returnCode === "-1001") {
          console.log("请求失败，错误信息")
        } else {
          return res
        }
      },
      (err) => {
        if (err.respose.status === 404) {
          console.log("404的错误")
        }
        console.log("所有的实例都有的拦截器：响应拦截失败！！！")
        return err
      }
    )
  }

  request<T>(config: ZMJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1、当个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2、判断是否需要显示loading
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = false
          // 3、将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = false
          reject(err)
        })
    })
  }

  get<T>(config: ZMJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: ZMJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: ZMJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  put<T>(config: ZMJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" })
  }
}

export default ZMJRequest
