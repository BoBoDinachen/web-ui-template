<script setup lang="ts">
import { NResult, NButton } from "naive-ui"
import { request } from "@/utils/service"
import { onMounted } from "vue"
onMounted(() => {
    request({
        url: "/get",
        method: "get",
    }).then((res) => { 
        console.log(res);
    })
})
</script>
<template>
    <div class="app-container center">
        <n-result status="warning" title="警告" description="在它变成错误以前一般不会有人管它">
            <template #footer>
                <n-button>听起来有那么点悲伤，哈哈哈</n-button>
            </template>
        </n-result>
    </div>
</template>

<style lang="scss" scoped>
.center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
