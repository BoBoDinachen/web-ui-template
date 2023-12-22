<script lang="ts" setup>
import { computed } from "vue"
import { RouterView } from "vue-router"
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NGlobalStyle
} from "naive-ui"
import { useTheme } from "@/hooks/useTheme"
// theme
import { darkTheme, lightTheme } from "naive-ui"
// locale & dateLocale
import { zhCN, dateZhCN } from "naive-ui"
const { isDarkTheme } = useTheme()

const theme = computed(() => {
  return isDarkTheme.value ? darkTheme : lightTheme
})
</script>

<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider placement="bottom-right">
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-notification-provider>
    <n-global-style />
  </n-config-provider>
</template>

<style scoped></style>
