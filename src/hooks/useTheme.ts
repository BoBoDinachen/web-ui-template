import { computed, ref, watchEffect } from "vue"
import {
  getActiveThemeName,
  setActiveThemeName,
} from "@/utils/cache/localStorage"
import { useThemeVars } from "naive-ui"

const DEFAULT_THEME_NAME = "dark"

/** 注册的主题名称, 其中 DefaultThemeNameType 是必填的 */
export type ThemeName = "default" | "dark" 

interface IThemeList {
  title: string
  name: ThemeName
}

/** 主题列表 */
const themeList: IThemeList[] = [
  {
    title: "默认",
    name: 'default',
  },
  {
    title: "黑暗",
    name: "dark",
  },
]

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(
  getActiveThemeName() || DEFAULT_THEME_NAME,
)

const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
}

/** 在 html 根元素上挂载 class */
const setHtmlClassName = (value: ThemeName) => {
  document.documentElement.className = value
}

const initTheme = () => {
  watchEffect(() => {
    const value = activeThemeName.value
    setHtmlClassName(value)
    setActiveThemeName(value)
  })
}

// 是否是dark主题
const isDarkTheme = computed(() => {
  return activeThemeName.value == "dark"
})

/** 主题 hook */
export function useTheme() {
  const themeVar = useThemeVars()

  return {
    themeList,
    activeThemeName,
    isDarkTheme,
    initTheme,
    setTheme,
    themeVar,
  }
}
