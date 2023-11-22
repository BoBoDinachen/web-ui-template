<script lang="ts" setup>
import { computed } from "vue"
import { type ThemeName, useTheme } from "@/hooks/useTheme"
import { ColorPaletteOutline as ColorPaletteIcon, Key } from "@vicons/ionicons5"
import { NIcon, NTooltip, NDropdown } from "naive-ui"
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
        <div style="position: relative; width: 40px; height: 25px; padding: 0 5px; cursor: pointer" class="theme-switch">
            <NTooltip trigger="hover" placement="bottom">
                <template #trigger>
                    <NIcon size="25" style="position: absolute; margin: auto; top: 0; right: 0; left: 0; bottom: 0">
                        <ColorPaletteIcon></ColorPaletteIcon>
                    </NIcon>
                </template>
                主题模式
            </NTooltip>
        </div>
    </NDropdown>
</template>
