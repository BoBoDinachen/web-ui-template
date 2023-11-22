<script lang="ts" setup>
import { reactive, ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/modules/user"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import type { FormInst, FormRules } from "naive-ui"
import { NForm, NFormItem, NInput, NButton, NIcon, NImage } from "naive-ui"
import { PersonOutline, KeyOutline, LockClosedOutline } from "@vicons/ionicons5"
import { getLoginCodeApi } from "@/api/auth"
import { type ILoginRequestData } from "@/api/auth/types/login"
import { useTheme } from "@/hooks/useTheme"

const router = useRouter()
const loginFormRef = ref<FormInst | null>(null)
const { activeThemeName } = useTheme()
/**
 * 登录框的阴影
 */
const boxShadow = computed(() => {
    if (activeThemeName.value == "dark") {
        return "unset"
    } else {
        return "0 0 15px 0.01px #dcdfe6"
    }
})
/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
const codeUrl = ref("")
/** 登录表单数据 */
const loginForm: ILoginRequestData = reactive({
    userName: "Admin",
    password: "12345678",
    code: "",
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        // { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
    ],
    code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
}
/** 登录逻辑 */
const handleLogin = () => {
    loginFormRef.value?.validate((errors) => {
        if (!errors) {
            loading.value = true
            useUserStore()
                .login({
                    userName: loginForm.userName,
                    password: loginForm.password,
                    code: loginForm.code,
                })
                .then(() => {
                    router.push({ path: "/" })
                })
                .catch(() => {
                    createCode()
                    loginForm.password = ""
                })
                .finally(() => {
                    loading.value = false
                })
        } else {
            return false
        }
    })
}
/** 创建验证码 */
const createCode = () => {
    // 先清空验证码的输入
    loginForm.code = ""
    // 获取验证码
    codeUrl.value = ""
    getLoginCodeApi().then((res) => {
        console.log("getLoginCodeApi:", res)

        codeUrl.value = `data:image/svg+xml;base64,${btoa(res.data)}`
    })
}

/** 初始化验证码 */
createCode()
</script>

<template>
    <div class="login-container">
        <ThemeSwitch />
        <div class="login-card">
            <div class="title">
                <img src="@/assets/logo.png" />
                <span>Manage System</span>
            </div>
            <div class="content">
                <n-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" :show-label="false">
                    <n-form-item path="userName">
                        <n-input
                            v-model:value="loginForm.userName"
                            size="large"
                            placeholder="用户名"
                            @keydown.enter.prevent
                        >
                            <template #prefix>
                                <n-icon :component="PersonOutline" />
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input
                            v-model:value="loginForm.password"
                            type="password"
                            placeholder="密码"
                            show-password-on="mousedown"
                            @keydown.enter.prevent
                        >
                            <template #prefix>
                                <n-icon :component="LockClosedOutline" />
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="code">
                        <n-input
                            v-model:value="loginForm.code"
                            type="text"
                            size="large"
                            placeholder="验证码"
                            @keydown.enter.prevent
                        >
                            <!-- 前缀 -->
                            <template #prefix>
                                <n-icon :component="KeyOutline" />
                            </template>
                            <!-- 后缀 -->
                            <template #suffix>
                                <n-image
                                    width="100"
                                    :src="codeUrl"
                                    @click="createCode"
                                    style="background-color: antiquewhite"
                                    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                                >
                                    <template #placeholder> </template>
                                </n-image>
                            </template>
                        </n-input>
                    </n-form-item>
                    <NButton :loading="loading" type="primary" size="large" @click="handleLogin">登录</NButton>
                </n-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    :deep(.theme-switch) {
        position: fixed !important;
        top: 5% !important;
        right: 5% !important;
        cursor: pointer !important;
    }
    .login-card {
        width: 480px;
        border-radius: 20px;
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: v-bind(boxShadow);
        background-color: #fff;
        overflow: hidden;
        .title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 150px;
            img {
                height: 45%;
                margin-bottom: 20px;
            }
            span {
                font-size: 20px;
                font-weight: bold;
            }
        }
        .content {
            padding: 20px 50px 50px 50px;
            :deep(.n-input__suffix) {
                padding: 0;
                overflow: hidden;
                .n-image {
                    width: 100px;
                    height: 40px;
                    border-left: 0px;
                    user-select: none;
                    cursor: pointer;
                    text-align: center;
                }
            }
            .n-button {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
</style>
