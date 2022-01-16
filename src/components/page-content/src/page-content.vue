<template>
  <div class="page-content">
    <mj-table
      :listData="userList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
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
import { defineComponent, computed, ref, watch } from "vue"
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

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const userList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    return {
      Edit,
      Delete,
      Refresh,
      userList,
      getPageData,
      dataCount,
      pageInfo
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
