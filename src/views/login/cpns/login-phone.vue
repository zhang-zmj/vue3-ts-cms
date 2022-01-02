<template>
  <div>
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <div class="get-code">
          <el-input v-model="phone.password" type="password"></el-input>
          <el-button class="code-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  setup() {
    const phone = reactive({
      number: "",
      password: ""
    })
    return {
      phone
    }
  }
})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;

  .code-btn {
    margin-left: 6px;
  }
}
</style>
