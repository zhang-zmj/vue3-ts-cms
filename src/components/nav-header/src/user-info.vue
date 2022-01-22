<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span style="padding: 10px">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Close" @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import localCaches from "@/utils/cache"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.usreInfo.name)
    const router = useRouter()
    const handleExitClick = () => {
      localCaches.deleteCache("token")
      router.push("/main")
    }

    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
