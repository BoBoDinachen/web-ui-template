import { ref } from "vue"
import store from "@/stores"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { useTagsViewStore } from "./tags-view"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { loginApi, getUserInfoApi } from "@/api/auth"
import { type ILoginRequestData } from "@/api/auth/types/login"
import { type RouteRecordRaw } from "vue-router"
import asyncRouteSettings from "@/config/async-route"

type UserProfile = {}

export const useUserStore = defineStore("user", () => {
    const token = ref<string>(getToken() || "")
    const roles = ref<string[]>([])
    const userName = ref<string>("")
    const profile = ref<UserProfile | null>(null)
    const permissionStore = usePermissionStore()
    const tagsViewStore = useTagsViewStore()

    /** 设置角色数组 */
    const setRoles = (value: string[]) => {
        roles.value = value
    }
    /** 登录 */
    const login = (loginData: ILoginRequestData) => {
        return new Promise((resolve, reject) => {
            loginApi({
                userName: loginData.userName,
                password: loginData.password,
                code: loginData.code,
            })
                .then((res) => {
                    console.log("loginApi:", res)
                    setToken(res.data.access_token)
                    token.value = res.data.access_token
                    resolve(true)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    /** 获取用户详情 */
    const getProfileInfo = () => {
        return new Promise((resolve, reject) => {
            getUserInfoApi()
                .then(async (res) => {
                    console.log("getUserInfoApi:", res)
                    const data = res.data
                    userName.value = data.userName
                    profile.value = data
                    // 验证返回的 roles 是否是一个非空数组
                    if (data.role && data.role.length > 0) {
                        setRoles([data.role])
                    } else {
                        // 塞入一个没有任何作用的默认角色，不然路由守卫逻辑会无限循环
                        roles.value = asyncRouteSettings.defaultRoles
                    }
                    resolve(res)
                })
                .catch((error) => {
                    // 塞入一个没有任何作用的默认角色，不然路由守卫逻辑会无限循环
                    roles.value = asyncRouteSettings.defaultRoles
                    reject(error)
                })
        })
    }
    /** 切换角色 */
    const changeRoles = async (role: string) => {
        const newToken = "token-" + role
        token.value = newToken
        setToken(newToken)
        await getProfileInfo()
        permissionStore.setRoutes(roles.value)
        resetRouter()
        permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
            router.addRoute(item)
        })
        _resetTagsView()
    }
    /** 登出 */
    const logout = () => {
        removeToken()
        token.value = ""
        roles.value = []
        resetRouter()
        _resetTagsView()
    }
    /** 重置 Token */
    const resetToken = () => {
        removeToken()
        token.value = ""
        roles.value = []
    }
    /** 重置 visited views 和 cached views */
    const _resetTagsView = () => {
        tagsViewStore.delAllVisitedViews()
        tagsViewStore.delAllCachedViews()
    }

    return {
        token,
        roles,
        userName,
        profile,
        setRoles,
        login,
        getProfileInfo,
        changeRoles,
        logout,
        resetToken,
    }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}
