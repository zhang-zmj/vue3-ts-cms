<template>
  <div>
    <zmj-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="hand-tabs">
          <el-button type="primary" :icon="Refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search" @click="handleQuryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </zmj-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import ZmjForm from "@/base-ui/form"
import { Refresh, Search } from "@/global/register-element"

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    ZmjForm
  },
  setup(props) {
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ""
    }
    const formData = ref(formOriginData)
    const handleResetClick = () => {
      //改变内部的每个值，发生变化，可以进行监听
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
    }

    // 用户点击搜索
    const handleQuryClick = () => {
      console.log("获取到的值")
    }

    return {
      formData,
      Refresh,
      Search,
      handleResetClick,
      handleQuryClick
    }
  }
})
</script>

<style scoped lang="less">
.header {
  color: red;
}
.hand-tabs {
  text-align: right;
  padding: 10px 30px;
}
</style>
