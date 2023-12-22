<script lang="ts" setup>
import { computed, h } from "vue"
import { useRoute, RouteRecordRaw } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/stores/modules/app"
import { usePermissionStore } from "@/stores/modules/permission"
import { useSettingsStore } from "@/stores/modules/settings"
import { NIcon, NMenu, NScrollbar, NLayoutSider } from "naive-ui"
import type { MenuOption } from "naive-ui"
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5"
import SvgIcon from "@/components/SvgIcon/index.vue" // Svg Component

import SidebarLogo from "./SidebarLogo.vue"
import { getCssVariableValue } from "@/utils"
import { RouterLink } from "vue-router"

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color")
const v3SidebarMenuTextColor = getCssVariableValue(
  "--v3-sidebar-menu-text-color",
)
const v3SidebarMenuActiveTextColor = getCssVariableValue(
  "--v3-sidebar-menu-active-text-color",
)

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()

const { showSidebarLogo } = storeToRefs(settingsStore)

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})

function renderIcon(icon: string) {
  return () => h(SvgIcon, { name: icon })
}

function renderLabel(route: RouteRecordRaw) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name: route.name,
        },
      },
      { default: () => route.meta?.title },
    )
}

//* 侧边栏菜单数据
const MenuOptions = computed<MenuOption[]>(() => {
  function modifyRouteAttributes(routeList: Array<RouteRecordRaw>) {
    return routeList.map((route) => {
      if (route.children && route.children?.length == 1) {
        route = route.children[0]
      }
      // 在这里修改需要的属性
      const modifiedRoute = {
        ...route,
        // 修改其他属性
        label: renderLabel(route),
        key: route.meta?.activeMenu || route.path,
        icon: route.meta?.svgIcon && renderIcon(route.meta?.svgIcon),
        show: !route.meta?.hidden,
      }
      // 如果有子路由，递归调用该函数
      if (modifiedRoute.children && modifiedRoute.children.length > 0) {
        modifiedRoute.children = modifyRouteAttributes(modifiedRoute.children)
      }
      return modifiedRoute
    })
  }
  const modifiedRoutes = modifyRouteAttributes(permissionStore.routes)
  return modifiedRoutes as MenuOption[]
})

function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) })
}
</script>

<template>
  <div :class="{ 'has-logo': showSidebarLogo }">
    <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
    <NMenu
      :collapsed="isCollapse"
      show-trigger
      :inverted="true"
      :collapsed-width="80"
      :collapsed-icon-size="22"
      :options="MenuOptions"
      :value="activeMenu"
      :expand-icon="expandIcon"
    ></NMenu>
    <!-- <el-scrollbar
            wrap-class="scrollbar-wrapper"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="MenuOptions"
        >
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="v3SidebarMenuBgColor"
                :text-color="v3SidebarMenuTextColor"
                :active-text-color="v3SidebarMenuActiveTextColor"
                :unique-opened="true"
                :collapse-transition="false"
                mode="vertical"
            >
                <SidebarItem
                    v-for="route in permissionStore.routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                    :is-collapse="isCollapse"
                />
            </el-menu>
        </el-scrollbar> -->
  </div>
</template>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--v3-header-height));
  }
}
</style>
