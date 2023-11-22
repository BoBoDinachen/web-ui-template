import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"
import "@/router/permission"
import stores from "@/stores/index"

// load
import { loadSvg } from "@/icons"

// css
import "normalize.css"
import "@/styles/index.scss"

const app = createApp(App)

/** 加载全局 SVG */
loadSvg(app)

app.use(stores).use(router).mount("#app")
