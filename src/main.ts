import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { globalRegister } from "./global"
import "normalize.css"
import "./assets/css/index.css"
import { setupStore } from "@/store/index"

const app = createApp(App)
app.use(globalRegister)
app.use(store)
// 防止用户刷新，刷新后容易 出现not-found界面
setupStore()
app.use(router)
app.mount("#app")
