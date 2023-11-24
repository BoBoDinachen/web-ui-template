<script lang="ts" setup>
import { NResult, NButton } from "naive-ui"
</script>
<template>
  <n-result
    status="403"
    title="403 禁止访问"
    description="总有些门是对你关闭的"
  >
    <template #footer>
      <router-link to="/">
        <n-button>放轻松</n-button>
      </router-link>
    </template>
  </n-result>
</template>
