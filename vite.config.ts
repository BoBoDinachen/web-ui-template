import { fileURLToPath, URL } from "node:url"

import { loadEnv, type UserConfigExport, type ConfigEnv } from "vite"

// plugin
import svgLoader from "vite-svg-loader"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { viteMockServe } from "vite-plugin-mock"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
    const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
    const { VITE_PUBLIC_PATH } = viteEnv
    return {
        /** 打包时根据实际情况修改 base */
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        server: {
            /** 是否开启 HTTPS */
            https: false,
            /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
            host: true, // host: "0.0.0.0"
            /** 端口号 */
            port: 3000,
            /** 是否自动打开浏览器 */
            open: false,
            /** 跨域设置允许 */
            cors: true,
            /** 端口被占用时，是否直接退出 */
            strictPort: false,
            /** 接口代理 */
            proxy: {
                "/api": {
                    target: "http://localhost:8080/service",
                    ws: true,
                    /** 是否允许跨域 */
                    changeOrigin: true,
                    rewrite: (path) => path.replace("/api", ""),
                },
            },
        },
        build: {
            /** 消除打包大小超过 500kb 警告 */
            chunkSizeWarningLimit: 2000,
            /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
            minify: "terser",
            /** 在打包代码时移除 console.log、debugger 和 注释 */
            terserOptions: {
                compress: {
                    drop_console: false,
                    drop_debugger: true,
                    pure_funcs: ["console.log"],
                },
                format: {
                    /** 删除注释 */
                    comments: true,
                },
            },
            /** 打包后静态资源目录 */
            assetsDir: "static",
        },
        plugins: [
            vue(),
            vueJsx(),
            /** 将 SVG 静态图转化为 Vue 组件 */
            svgLoader({ defaultImport: "url" }),
            /** SVG */
            createSvgIconsPlugin({
                iconDirs: [fileURLToPath(new URL("src/icons/svg", import.meta.url))],
                symbolId: "icon-[dir]-[name]",
            }),
            /** MOCK */
            viteMockServe({
                mockPath: "./mock",
                enable: true,
                watchFiles: false
            }),
        ],
    }
}
