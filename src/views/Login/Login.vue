<template>
  <div class="login">
    <div class="login__container">
      <div class="login__container__image">
        <img src="@/assets/svg/loginBg.svg" alt="" />
      </div>
      <div class="login__container__content">
        <h2>Login</h2>
        <p>欢迎来到fruit-stall-admin</p>
        <el-form
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 600px"
        >
          <el-form-item>
            <el-input
              style="width: 16rem"
              placeholder="请输入账号"
              v-model="formLabelAlign.account"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              style="width: 16rem"
              placeholder="请输入密码"
              v-model="formLabelAlign.password"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              style="width: 16rem"
              placeholder="请输入验证码"
              v-model="formLabelAlign.code"
            />
            <img
              class="login__code"
              @click="setCaptchaUrl"
              :src="captchaUrl"
              alt=""
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm"
              >登录<el-icon> <Right /> </el-icon
            ></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { Right } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useMenusStore } from "@/stores";
import { v4 as uuidv4 } from "uuid";
const store = useMenusStore();
const router = useRouter();
const formLabelAlign = reactive({
  account: "",
  password: "",
  code: "",
});
const codeId = ref("");
const captchaUrl = ref("");
const setCaptchaUrl = () => {
  codeId.value = uuidv4();
};
function submitForm() {
  ElMessage.success("登录成功");
  store.isShow = true;
  router.push(store.list[store.active].path);
}
setCaptchaUrl();
</script>
<style lang="scss">
.login {
  color: $color-dark;
  height: 100vh;
  width: 100vw;
  background-color: #defff6;
  @include flex(row, center, center);
  &__code {
    height: 100%;
    width: 80px;
    top: 0;
    position: absolute;
    right: 0;
  }
  &__container {
    width: 1486px;
    height: 752px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    @include flex(row, center);
    background-color: white;
    &__image {
      width: 715px;
      height: 100%;
      border-radius: 0 20px 20px 0;
      background-color: #03bf8a;
      @include flex(row, center, center);

      img {
        height: 100%;
        width: 100%;
        transform: translateX(88px);
      }
    }
    &__content {
      @include flex(column, center, center);
      flex: 1;
      height: 100%;
      h2 {
        font-size: 44px;
        margin: 20px 0;
      }

      .el-form-item {
        margin-top: 1.33rem;
      }

      .el-button {
        height: 1.5rem;
        padding: 0.725rem 1rem;
      }

      .el-icon {
        margin-left: 20px;
      }

      p {
        font-size: 16px;
        color: $color-gray-light;
        margin: 20px 0;
      }
    }
  }
}
</style>
