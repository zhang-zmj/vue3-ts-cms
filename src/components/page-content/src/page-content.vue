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
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建用户</el-button
        >
        <!-- <el-button :icon="Refresh"></el-button> -->
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
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            :icon="Edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            :icon="Delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-conten中动态插入剩余的插槽 -->
      <template
        v-for="item in otherProopSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </mj-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import { Edit, Delete, Refresh } from "@/global/register-element"
import MjTable from "@/base-ui/table"
import { useStore } from "@/store"
import { usePermission } from "@/hooks/use-permission"

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
  emits: [`newBtnClick`, `editBtnClick`],
  setup(props, { emit }) {
    const store = useStore()

    // 0. 获取操作的权限
    const isCreate = usePermission(props.pageName ?? "", "create")
    const isUpdate = usePermission(props.pageName ?? "", "update")
    const isDelete = usePermission(props.pageName ?? "", "delete")
    const isQuery = usePermission(props.pageName ?? "", "query")

    // 1、双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2、发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3、从vuex中获取数据
    const userList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4、获取其他的动态插槽
    const otherProopSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false
        if (item.slotName === "createAt") return false
        if (item.slotName === "updateAt") return false
        if (item.slotName === "handler") return false
        return TextTrackCue
      }
    )

    // 5、删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleNewClick = () => {
      emit("newBtnClick")
    }
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item)
    }

    return {
      Edit,
      Delete,
      Refresh,
      userList,
      getPageData,
      dataCount,
      pageInfo,
      otherProopSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
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
