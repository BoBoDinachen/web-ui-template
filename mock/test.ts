import { MockMethod, MockConfig } from "vite-plugin-mock"

export default [
    {
        url: "/mock/get",
        method: "get",
        response: ({ query }) => {
            return {
                code: "00000",
                data: {
                    name: "vben432",
                },
            }
        },
    },
    {
        url: "/mock/post",
        method: "post",
        timeout: 2000,
        response: {
            code: 0,
            data: {
                name: "vben",
            },
        },
    },
    {
        url: "/mock/text",
        method: "post",
        rawResponse: async (req, res) => {
            let reqbody = ""
            await new Promise((resolve) => {
                req.on("data", (chunk) => {
                    reqbody += chunk
                })
                req.on("end", () => resolve(undefined))
            })
            res.setHeader("Content-Type", "text/plain")
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
] as MockMethod[]
