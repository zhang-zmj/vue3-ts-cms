<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldChange">
      <div v-if="isFold"><expand /></div>
      <div v-else><fold /></div>
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  emits: ["foldChange"],
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
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
