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
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>

    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { useStore } from "@/store"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const newCallback = () => {
      const passwordItem = modalConfig.formItems?.find(
        (item) => item.field === "password"
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }

    const editCallback = () => {
      const passwordItem = modalConfig.formItems?.find(
        (item) => item.field === "password"
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }

    //2、动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmeentItem = modalConfig.formItems?.find(
        (item) => item.field === "departmentId"
      )
      departmeentItem!.optins = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems?.find(
        (item) => item.field === "roleId"
      )
      roleItem!.optins = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modalConfig
    })

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
