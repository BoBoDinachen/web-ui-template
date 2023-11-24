<script lang="ts" setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="sidebar-logo-container">
    <!-- <router-link v-if="props.collapse" key="collapse" to="/">
      <img src="@/assets/logo.png" class="collapse-sidebar-logo" />
    </router-link>
    <router-link v-else key="expand" to="/">
      <div class="expand">
        <img src="@/assets/logo.png" class="expand-sidebar-logo" />
        <span class="sidebar-logo-text">Manage System</span>
      </div>
    </router-link> -->
    <img src="@/assets/logo.png" alt=""/>
    <h2 v-show="!props.collapse" class="title">Manage System</h2>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  overflow: hidden;
  white-space: nowrap;
  img {
    width: auto;
    height: 40px;
  }

  .title {
    font-size: 20px;
    margin-left: vw(5);
  }
}
</style>
