<script lang="ts" setup>
import { ref, onUnmounted } from "vue"
import { useMessage, NTooltip,NButton } from "naive-ui"
import screenfull from "screenfull"

const props = defineProps({
  /** 全屏的元素，默认是 html */
  element: {
    type: String,
    default: "html",
  },
  /** 打开全屏提示语 */
  openTips: {
    type: String,
    default: "全屏",
  },
  /** 关闭全屏提示语 */
  exitTips: {
    type: String,
    default: "退出全屏",
  },
})

const message = useMessage()
const tips = ref<string>(props.openTips)
const isFullscreen = ref<boolean>(false)

const click = () => {
  const dom = document.querySelector(props.element) || undefined
  if (!screenfull.isEnabled) {
    message.warning("您的浏览器无法工作")
    return
  }
  screenfull.toggle(dom)
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
  tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips
}

screenfull.on("change", change)

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change)
  }
})
</script>

<template>
  <div @click="click" style="position: relative; width: 40px; height: 25px">
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-button quaternary>
          <template #icon>
            <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
          </template>
        </n-button>
      </template>
      <span>{{ tips }}</span>
    </n-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  &:focus {
    outline: none;
  }
}
</style>
