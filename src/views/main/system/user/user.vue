<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { usePageSearch } from "@/hooks/use-page-search"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      // ...usePageSearch
      handleResetClick,
      handleQueryClick,
      pageContentRef
    }
  }
})
</script>

<style scoped lang="less"></style>
