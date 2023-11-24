<script lang="ts" setup>
import {NResult,NButton} from "naive-ui"
</script>

<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <router-link to="/">
        <n-button>返回首页</n-button>
      </router-link>
    </template>
  </n-result>
</template>
