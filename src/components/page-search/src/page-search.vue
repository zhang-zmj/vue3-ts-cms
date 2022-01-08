<template>
  <div>
    <zmj-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="hand-tabs">
          <el-button type="el-icon-refresh" :icon="Refresh">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </template>
    </zmj-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import ZmjForm, { IFormItem, IForm } from "@/base-ui/form"
import { Refresh, Search } from "@element-plus/icons-vue"

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
  setup() {
    const formData = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      createTime: ""
    })

    return {
      formData,
      Refresh,
      Search
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
