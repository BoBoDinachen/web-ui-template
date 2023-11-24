<script lang="ts" setup>
import { computed } from "vue"
import { Language as LanguageIcon } from "@vicons/ionicons5"
import { NIcon, NTooltip, NDropdown, NButton } from "naive-ui"
import type { DropdownOption } from "naive-ui"

const handleSelectOption = (language: string) => {}

//* 语言下拉菜单菜单数据
const DropdownOption = computed<DropdownOption[]>(() => {
  return [
    {
      label: "中文",
      key: "zh",
    },
    {
      label: "English",
      key: "en",
    },
  ]
})
</script>

<template>
  <NDropdown
    trigger="click"
    :options="DropdownOption"
    @select="handleSelectOption"
  >
    <div class="language-switch">
      <NTooltip trigger="hover" placement="bottom">
        <template #trigger>
          <NButton quaternary>
            <template #icon>
              <NIcon size="25">
                <LanguageIcon></LanguageIcon>
              </NIcon>
            </template>
          </NButton>
        </template>
        选择语言
      </NTooltip>
    </div>
  </NDropdown>
</template>
