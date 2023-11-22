import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "/auth/captcha",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.ILoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "/auth/login/admin",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: `/auth/admin/profile`,
    method: "get",
  })
}
