<script lang="ts" setup>
import { ref } from "vue"
import { NIcon, NDrawer, NDrawerContent,useThemeVars } from "naive-ui"
import { SettingsOutline as SettingIcon } from "@vicons/ionicons5"

const props = defineProps({
    buttonTop: {
        type: Number,
        default: 350,
    },
    title: {
        type: String,
        default: "标题"
    }
})
const themeVar = useThemeVars()
const buttonTopCss = props.buttonTop + "px"
const show = ref(false)
</script>

<template>
    <div class="handle-button" @click="show = true">
        <NIcon size="24">
            <SettingIcon></SettingIcon>
        </NIcon>
    </div>
    <n-drawer v-model:show="show" :width="350" placement="right">
        <n-drawer-content :title="title"> <slot /> </n-drawer-content>
    </n-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
    width: 48px;
    height: 48px;
    background-color: v-bind('themeVar.iconColor');
    position: fixed;
    top: v-bind(buttonTopCss);
    right: 0px;
    border-radius: 6px 0 0 6px;
    z-index: 10;
    cursor: pointer;
    pointer-events: auto;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
