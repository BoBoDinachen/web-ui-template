<script setup lang="ts">
import { NResult, NButton } from "naive-ui"
</script>
<template>
  <n-result
    status="info"
    title="这是一个示例页面"
    description="在这个年代，信息就是金钱，金钱就是信息。"
  >
    <template #footer>
      <n-button>你好世界</n-button>
    </template>
  </n-result>
</template>
<style lang="scss" scoped></style>
