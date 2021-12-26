import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import { globalRegister } from "./global"

import MJRequest from "./network"

const app = createApp(App)
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount("#app")

// MJRequest.request({
//   url: "/home/multidata",
//   method: "GET",
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log("单独请求的config")
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log("单独响应的的response")
//       return res
//     }
//   },
//   showLoading: false
// }).then((res) => {
//   console.log(res)
// })

interface DataType {
  data: any
  returnCode: number
  msg: string
}

MJRequest.request<DataType>({
  url: "/home/multidata",
  method: "GET"
}).then((res) => {
  console.log("-------------", res.data)
})
