<script lang="ts" setup>
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
        <svg-icon name="collapse" class="icon" v-if="props.isActive"></svg-icon>
        <svg-icon name="expand" class="icon" v-else></svg-icon>
    </div>
</template>

<style lang="scss" scoped>
.icon {
    vertical-align: middle;
}
</style>
