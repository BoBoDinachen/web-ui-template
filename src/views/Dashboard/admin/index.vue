<script lang="ts" setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useTheme } from "@/hooks/useTheme"

const router = useRouter()
const { activeThemeName, themeVar } = useTheme()

const loginTime = computed(() => {
  return "2023年11月23日"
})
const titleColor = computed(() => {
  if (activeThemeName.value == "dark") {
    return "#ffff"
  }
})
</script>
<template>
  <div class="app-container center">
    <!-- 左边部分 -->
    <div class="left-container">
      <!-- 顶部横幅 -->
      <div class="left-header-warp">
        <span class="title">快速开始</span>
        <span class="text"></span>
      </div>
      <!-- 内容区域1- 数据统计 -->
      <div class="left-content-warp-first">
        <div class="content-header">
          <span class="title">内容区域一</span>
        </div>
      </div>
      <!-- 内容区域2- 区域物品 -->
      <div class="left-content-warp-second">
        <div class="content-header">
          <span class="title">内容区域2</span>
          <span class="more-text" @click="router.push({ name: 'AreaManage' })">
            更多
          </span>
        </div>
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="right-container">
      <!-- 顶部横幅 -->
      <div class="right-header-warp">
        <div class="header-cover"></div>
        <div class="header-center-warp">
          <div class="title">管理员您好，祝你开心每一天</div>
          <div class="text">登录于:{{ loginTime }}</div>
        </div>
        <div class="header-icon-warp"></div>
      </div>
      <div class="right-content-warp-first">
        <div class="content-header">
          <span class="title">个人资料</span>
          <span
            class="more-text"
            @click="
              () => {
                router.push('/personal/center')
              }
            "
          >
            更多
          </span>
        </div>
        <div class="content-box"></div>
      </div>
      <div class="right-content-warp-second">
        <div class="content-header">
          <span class="title">区域三</span>
          <span
            class="more-text"
            @click="
              router.push({
                name: ``,
              })
            "
          >
            更多
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 间隔
$interval: 20px;
// 圆角
$radius: 5px;
$content-padding: 25px;
.center {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: $interval;
  @mixin header-warp-text {
    .title {
      font-weight: 600;
      font-size: 1.3rem;
    }
    .text {
      font-size: 1rem;
    }
  }
  @mixin content-warp {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;
    flex: 1;
    border-radius: $radius;
    background-color: v-bind("themeVar.cardColor");
    padding: $content-padding;
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        color: v-bind(titleColor);
        font-size: 1.3rem;
        font-weight: 600;
      }
      .more-text {
        font-size: 0.8rem;
        color: #409eff;
        cursor: pointer;
      }
    }
    .content-box {
      flex: 1;
      box-sizing: border-box;
    }
  }
  .left-container {
    display: flex;
    flex-direction: column;
    gap: $interval;
    flex: 3;
    .left-header-warp {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 30px 30px 30px;
      gap: 10px;
      height: 100px;
      border-radius: $radius;
      color: v-bind("themeVar.textColor1");
      text-align: left;
      background-color: v-bind("themeVar.cardColor");
      background-size: 200px 200px;
      background-position: right center;
      background-repeat: no-repeat;
      @include header-warp-text();
    }

    // 左边内容区域一
    .left-content-warp-first {
      @include content-warp();
    }
    // 左边内容区域二
    .left-content-warp-second {
      @include content-warp();
    }
  }
  .right-container {
    display: flex;
    flex-direction: column;
    gap: $interval;
    flex: 2;
    height: 100%;
    // background-color: #ffff;
    .right-header-warp {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 30px 30px 30px;
      height: 100px;
      gap: 10px;
      border-radius: $radius;
      background-color: v-bind("themeVar.cardColor");
      color: v-bind("themeVar.textColor1");
      box-sizing: border-box;
      .header-cover {
        width: 100px;
        height: 100px;
      }
      .header-center-warp {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 10px;
        @include header-warp-text();
      }
      .header-icon-warp {
        flex: 1;
        display: flex;
        justify-content: end;
      }
    }
    .right-content-warp-first {
      @include content-warp();
    }
    .right-content-warp-second {
      @include content-warp();
    }
  }
}
</style>
