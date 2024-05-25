<template>
  <div class="info">
    <h2 class="info__title">信息管理</h2>
    <div class="info__container">
      <ShowPanel :admin="admin" />
      <div class="info__container-form">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="basic">
            <BasicControls :admin="admin" @changeAdmin="changeAdmin" />
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="password">
            <PasswordControls />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ShowPanel from './components/ShowPanel.vue'
import BasicControls from './components/BasicControls.vue'
import PasswordControls from './components/PasswordControls.vue'
import { ref, reactive } from 'vue'
import type { Admin } from '@/types'
import type { TabsPaneContext } from 'element-plus'
const activeName = ref('basic')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const admin = reactive<Admin>({
  name: 'lineo',
  sex: '男',
  desc: '落叶的位置',
  tags: ['前端', '后端', '测试']
})
function changeAdmin(opt: Admin) {
  admin.desc = opt.desc
  admin.name = opt.name
  admin.tags = opt.tags
  admin.sex = opt.sex
}
</script>
<style lang="scss" scoped>
.info {
  @include routerView();
  &__container {
    @include flex($ai: flex-start);
    &-form {
      flex: 1;
      background-color: #fff;
      box-shadow: 2px 2px 8px $color-gray-light;
      border-radius: 8px;
      @include boxPadding(20px);
    }
  }
}
</style>
