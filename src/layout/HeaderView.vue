<template>
  <header class="header">
    <div class="bread-crumb">
      当前位置：<span>{{ title }}</span>
    </div>
    <div class="user">
      <el-popconfirm
        class="header-popconfirm"
        hide-icon
        confirm-button-text="Yes"
        cancel-button-text="No"
        :icon="InfoFilled"
        title="是否退出登录?"
        @confirm="confirmEvent"
        @cancel="cancelEvent"
        confirm-button-type="success"
        width="8rem"
      >
        <template #reference>
          <el-avatar :size="(30 * avatarPx) / 19.2" :src="circleUrl" />
        </template>
      </el-popconfirm>
      <span>admin</span>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { pxToRem } from '@/utils/rem'
import { useRouter } from 'vue-router'
const avatarPx = ref(pxToRem)
const router = useRouter()
import { useMenusStore } from '@/stores'
const store = useMenusStore()
defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const confirmEvent = () => {
  store.isShow = false
  router.push('/login')
}
const cancelEvent = () => {
  console.log('cancel!')
}
</script>
<style lang="scss">
.header {
  color: $color-dark;
  height: 56px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(31, 45, 61, 0.04);
  @include boxPadding(0 20px);
  @include flex(row, center, space-between);

  .header-popconfirm {
    font-size: 14px;
  }

  .bread-crumb {
    color: $color-gray-light;
    font-size: 16px;

    span {
      color: $color-dark;
    }
  }

  > .user {
    @include flex(row, center, space-between);

    span {
      margin-left: 8px;
      font-size: 16px;
    }
  }
}
</style>
