<template>
  <div class="page-content">
    <mj-table :listData="userList" v-bind="contentTableConfig">
      <!--1、 header中的插槽  -->
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
        <el-button :icon="Refresh"></el-button>
      </template>

      <!-- 2、列中的插槽 -->
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button :icon="Edit" size="mini" type="text">编辑</el-button>
          <el-button :icon="Delete" size="mini" type="text">删除</el-button>
        </div>
      </template>
    </mj-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { Edit, Delete, Refresh } from "@/global/register-element"
import MjTable from "@/base-ui/table"
import { useStore } from "@/store"

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    MjTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch("system/getPageListAction", {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    return {
      Edit,
      Delete,
      Refresh,
      userList
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .handle-btns {
    display: flex;
    align-items: center;
  }
}
</style>
