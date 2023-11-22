import { UserInfo } from "types/entity"
export interface ILoginRequestData {
    /** 用户名(普通管理员  超级管理员) */
    userName: string
    /** 密码 */
    password: string
    /** 验证码 */
    code: string
}

export type LoginCodeResponseData = IApiResponseData<string>

export type LoginResponseData = IApiResponseData<{ access_token: string }>

export type UserInfoResponseData = IApiResponseData<UserInfo>
