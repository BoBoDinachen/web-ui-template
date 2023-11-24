<script lang="ts" setup>
import { type PropType, computed, ref, watch, nextTick, onMounted } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { NIcon, NScrollbar } from "naive-ui"
import { ChevronBack as LeftIcon, ChevronForward as RightIcon } from "@vicons/ionicons5"
import { useSettingsStore } from "@/stores/modules/settings"
import Screenfull from "@/components/Screenfull/index.vue"

const props = defineProps({
    tagRefs: {
        type: Object as PropType<InstanceType<typeof RouterLink>[]>,
        required: true,
    },
})

const route = useRoute()
const settingsStore = useSettingsStore()

const scrollbarRef = ref<InstanceType<typeof NScrollbar>>()
const scrollbarContentRef = ref<HTMLDivElement>()

/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0
/** 每次滚动距离 */
const translateDistance = 200

/** 滚动时触发 */
const scroll = (e:Event) => {
    console.log("scroll: ",e);
    //currentScrollLeft = scrollLeft
}

/** 鼠标滚轮滚动时触发 */
const wheelScroll = ({ deltaY }: WheelEvent) => {
    if (/^-/.test(deltaY.toString())) {
        scrollTo("left")
    } else {
        scrollTo("right")
    }
}

/** 获取可能需要的宽度 */
const getWidth = () => {
    /** 可滚动内容的长度 */
    const scrollbarContentRefWidth = scrollbarContentRef.value!.clientWidth
    /** 滚动可视区宽度 */
    const scrollbarRefWidth = scrollbarRef.value!.scrollbarInstRef!.containerRef!.clientWidth
    /** 最后剩余可滚动的宽度 */
    const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft

    return { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance }
}

/** 左右滚动 */
const scrollTo = (direction: "left" | "right", distance: number = translateDistance) => {
    let scrollLeft = 0
    const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } = getWidth()
    // 没有横向滚动条，直接结束
    if (scrollbarRefWidth > scrollbarContentRefWidth) return
    if (direction === "left") {
        scrollLeft = Math.max(0, currentScrollLeft - distance)
    } else {
        scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)
    }
    scrollbarRef.value!.scrollBy({left:scrollLeft})
}

/** 移动到目标位置 */
const moveTo = () => {
    const tagRefs = props.tagRefs
    for (let i = 0; i < tagRefs.length; i++) {
        // @ts-ignore
        if (route.path === tagRefs[i].$props.to.path) {
            // @ts-ignore
            const el: HTMLElement = tagRefs[i].$el
            const offsetWidth = el.offsetWidth
            const offsetLeft = el.offsetLeft
            const { scrollbarRefWidth } = getWidth()
            // 当前 tag 在可视区域左边时
            if (offsetLeft < currentScrollLeft) {
                const distance = currentScrollLeft - offsetLeft
                scrollTo("left", distance)
                return
            }
            // 当前 tag 在可视区域右边时
            const width = scrollbarRefWidth + currentScrollLeft - offsetWidth
            if (offsetLeft > width) {
                const distance = offsetLeft - width
                scrollTo("right", distance)
                return
            }
        }
    }
}

watch(
    route,
    () => {
        nextTick(moveTo)
    },
    {
        deep: true,
    }
)

const showScreenfull = computed(() => {
    return settingsStore.showScreenfull
})
</script>

<template>
    <div class="scroll-container">
        <NIcon class="arrow left" @click="scrollTo('left')">
            <LeftIcon></LeftIcon>
        </NIcon>
        <NScrollbar ref="scrollbarRef"  @wheel.prevent="wheelScroll" @scroll="scroll">
            <div ref="scrollbarContentRef" class="scrollbar-content">
                <slot />
            </div>
        </NScrollbar>
        <NIcon class="arrow right" @click="scrollTo('right')">
            <RightIcon></RightIcon>
        </NIcon>
        <Screenfull v-if="showScreenfull" element=".app-main" openTips="内容区全屏" class="screenfull" />
    </div>
</template>

<style lang="scss" scoped>
.scroll-container {
    height: 100%;
    padding: 0 vw(10) 0;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;
        cursor: pointer;
        &.left {
            box-shadow: 5px 0 5px -6px #ccc;
        }
        &.right {
            box-shadow: -5px 0 5px -6px #ccc;
        }
    }
    .n-scrollbar {
        flex: 1;
        // 横向超出窗口长度时，显示滚动条
        white-space: nowrap;
        .scrollbar-content {
            display: inline-block;
        }
    }
    .screenfull {
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
</style>
