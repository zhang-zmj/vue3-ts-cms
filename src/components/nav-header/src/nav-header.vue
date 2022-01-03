<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldChange">
      <div v-if="isFold"><expand /></div>
      <div v-else><fold /></div>
    </el-icon>

    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import UserInfo from "./user-info.vue"

export default defineComponent({
  emits: ["foldChange"],
  components: {
    UserInfo
  },

  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    return {
      isFold,
      handleFoldChange
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
