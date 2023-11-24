<script setup lang="ts">
import { NResult, NButton } from "naive-ui"
</script>
<template>
  <n-result
    status="500"
    title="示例页面2"
    description="服务器出错可能说明该雇更多程序员了"
  >
    <template #footer>
      <n-button>散财消灾</n-button>
    </template>
  </n-result>
</template>
<style lang="scss" scoped></style>
