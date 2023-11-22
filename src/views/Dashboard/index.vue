<script lang="ts" setup>
import { ref, h, computed } from "vue"
import { useUserStore } from "@/stores/modules/user"
import AdminDashboard from "./admin/index.vue"
import RootDashboard from "./root/index.vue"
import { useNotification } from "naive-ui"

type CurrentRoleType = "admin" | "editor"

const notification = useNotification()
const userStore = useUserStore()
const currentRole = ref<CurrentRoleType>("admin")
if (!userStore.roles.includes("admin")) {
    currentRole.value = "editor"
}
notification.success({
    title: "",
    content: "说点啥呢",
    meta: "想不出来",
    duration: 2500,
    keepAliveOnHover: true,
})

</script>

<template>
    <component :is="currentRole === 'admin' ? AdminDashboard : RootDashboard" />
</template>
