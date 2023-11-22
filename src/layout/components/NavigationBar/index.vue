<script lang="ts" setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useAppStore } from "@/stores/modules/app"
import { useSettingsStore } from "@/stores/modules/settings"
import { useUserStore } from "@/stores/modules/user"
import { PersonCircle as UserIcon } from "@vicons/ionicons5"
import { NDropdown, NIcon, NAvatar } from "naive-ui"
import type { DropdownOption } from "naive-ui"
import Breadcrumb from "../Breadcrumb/index.vue"
import Hamburger from "../Hamburger/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

//* 下来菜单选项
const DropdownOptions = ref<DropdownOption[]>([
    {
        label: "个人中心",
        key: 0,
        disabled: false,
    },
    {
        label: "个人设置",
        key: 1,
        disabled: false,
    },
    {
        label: "退出登录",
        key: 2,
        disabled: false,
    },
])

const sidebar = computed(() => {
    return appStore.sidebar
})
const showNotify = computed(() => {
    return settingsStore.showNotify
})
const showThemeSwitch = computed(() => {
    return settingsStore.showThemeSwitch
})
const showScreenfull = computed(() => {
    return settingsStore.showScreenfull
})

const toggleSidebar = () => {
    appStore.toggleSidebar(false)
}
const logout = () => {
    userStore.logout()
    router.push("/login")
}
/**
 * 处理点击下拉菜单每个子项的回调函数
 * @param key 指定参数
 */
function handleClickDropdownItem(key: number, option: DropdownOption) {
    console.log("handleClickDropdownItem:", key)
    window.$message.info(option.label + "")
    switch (key) {
        case 0:
            // 跳转到个人中心
            // router.push("/personal/center")
            break
        case 1:
            // 跳转到个人设置
            // router.push("/personal/setting")
            break
        case 2:
            // 退出登录
            userStore.logout()
            router.push("/login")
            break
        default:
            break
    }
}
</script>

<template>
    <div class="navigation-bar">
        <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
        <Breadcrumb class="breadcrumb" />
        <div class="right-menu">
            <Screenfull v-if="showScreenfull" class="right-menu-item" />
            <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
            <!-- 暂时隐藏掉通知图标 -->
            <!-- <Notify v-if="showNotify" class="right-menu-item" /> -->
            <NDropdown
                class="right-menu-item"
                trigger="hover"
                :options="DropdownOptions"
                size="large"
                @select="handleClickDropdownItem"
            >
                <div class="right-menu-avatar">
                    <n-avatar round size="large" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
                        <NIcon>
                            <UserIcon></UserIcon>
                        </NIcon>
                    </n-avatar>
                    <span>{{ userStore.userName }}</span>
                </div>
            </NDropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
    height: var(--v3-navigationbar-height);
    overflow: hidden;
    background: #fff;
    .hamburger {
        display: flex;
        align-items: center;
        height: 100%;
        float: left;
        padding: 0 15px;
        cursor: pointer;
    }
    .breadcrumb {
        float: left;
        // 参考 Bootstrap 的响应式设计 WIDTH = 576
        @media screen and (max-width: 576px) {
            display: none;
        }
    }
    .right-menu {
        float: right;
        margin-right: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        color: #606266;
        .right-menu-item {
            padding: 0 5px;
            cursor: pointer;
        }
        .right-menu-avatar {
            display: flex;
            align-items: center;
            .n-avatar {
                margin-right: 10px;
            }
            span {
                font-size: 16px;
            }
        }
    }
}
</style>
