<script lang="ts" setup>
import { RouterView } from "vue-router"
import { NConfigProvider, NMessageProvider, NNotificationProvider } from "naive-ui"
// theme
import { createTheme } from "naive-ui"
// locale & dateLocale
import { zhCN, dateZhCN } from "naive-ui"

const darkTheme = createTheme([])
</script>

<template>
    <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
        <n-notification-provider placement="bottom-right">
            <n-message-provider>
                <RouterView />
            </n-message-provider>
        </n-notification-provider>
    </n-config-provider>
</template>

<style scoped></style>
