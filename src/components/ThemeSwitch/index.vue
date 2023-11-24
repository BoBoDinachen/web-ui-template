<script lang="ts" setup>
import { computed } from "vue"
import { type ThemeName, useTheme } from "@/hooks/useTheme"
import { ColorPaletteOutline as ColorPaletteIcon, Key } from "@vicons/ionicons5"
import { NIcon, NTooltip, NDropdown,NButton } from "naive-ui"
import type { DropdownOption } from "naive-ui"

const { themeList, activeThemeName, setTheme } = useTheme()

const handleSetTheme = (name: ThemeName) => {
  setTheme(name)
}

//* 主题下拉菜单菜单数据
const DropdownOption = computed<DropdownOption[]>(() => {
  return themeList.map((theme) => ({
    label: theme.title,
    key: theme.name,
    disabled: activeThemeName.value === theme.name,
  }))
})
</script>

<template>
  <NDropdown trigger="click" :options="DropdownOption" @select="handleSetTheme">
    <div
      class="theme-switch"
    >
      <NTooltip trigger="hover" placement="bottom">
        <template #trigger>
          <NButton quaternary >
            <template #icon>
              <NIcon
                size="25"
              >
                <ColorPaletteIcon></ColorPaletteIcon>
              </NIcon>
            </template>
          </NButton>
        </template>
        主题模式
      </NTooltip>
    </div>
  </NDropdown>
</template>
