<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useThemeVars } from "naive-ui";
import { useTagsViewStore } from "@/stores/modules/tags-view"

const route = useRoute()
const tagsViewStore = useTagsViewStore()

const themeVars = useThemeVars()
const key = computed(() => {
  return route.path
})
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden !important;
  background-color: v-bind('themeVars.modalColor');
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
