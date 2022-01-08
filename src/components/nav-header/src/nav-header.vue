<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldChange">
      <div v-if="isFold"><expand /></div>
      <div v-else><fold /></div>
    </el-icon>

    <div class="content">
      <mj-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import UserInfo from "./user-info.vue"
import MjBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb"
import { pathMapBreadcrumbs } from "@/utils/map-menus"
import { useStore } from "@/store"
import { useRoute, useRouter } from "vue-router"
import router from "@/router"

export default defineComponent({
  emits: ["foldChange"],
  components: {
    UserInfo,
    MjBreadcrumb
  },

  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    // 面包屑的数据
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.usreMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      handleFoldChange,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
