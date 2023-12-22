<script lang="ts" setup>
import { NIcon } from "naive-ui";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@vicons/antd"
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: "toggle-click"): void
}>()

const toggleClick = () => {
  emit("toggle-click")
}
</script>

<template>
  <div @click="toggleClick">
    <n-icon size="20" v-if="props.isActive">
      <MenuUnfoldOutlined />
    </n-icon>
    <n-icon size="20" v-else>
      <MenuFoldOutlined />
    </n-icon>
  </div>
</template>

<style lang="scss" scoped>
</style>
