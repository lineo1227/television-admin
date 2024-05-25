<template>
  <div class="showBroad">
    <img class="showBroad__avatar" src="@/assets/image/admin.jpg" alt="" />
    <div class="showBroad__name">{{ admin?.name }}</div>
    <div class="showBroad__intro">{{ admin?.desc }}</div>
    <div class="showBroad__follow">
      <el-button :style="{ height: (30 / 19.2) * pxToRem + 'px' }" type="primary" round
        >Follow me</el-button
      >
    </div>
    <ul class="showBroad__info">
      <li>
        <el-icon><User /></el-icon>
        前端小白白
      </li>
      <li>
        <el-icon><MagicStick /></el-icon>
        1992/8/11
      </li>
      <li>
        <el-icon><Male /></el-icon>
        {{ admin?.sex }}
      </li>
      <li>
        <el-icon><Postcard /></el-icon>
        滴滴-滴滴-哒哒
      </li>
      <li>
        <el-icon><Location /></el-icon>
        中国-北京-朝阳
      </li>
      <li>
        <el-icon><Paperclip /></el-icon>
        HTML、CSS、JavaScript
      </li>
    </ul>
    <el-divider />
    <h3>标签</h3>
    <ul class="showBroad__tag">
      <li v-for="item in admin?.tags" :key="item">
        <el-tag :style="{ height: (24 / 19.2) * pxToRem + 'px' }" type="success">{{ item }}</el-tag>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { pxToRem } from '@/utils/rem'
import { withDefaults } from 'vue'
import type { Admin } from '@/types'

import { User, MagicStick, Male, Postcard, Location, Paperclip } from '@element-plus/icons-vue'
const { admin } = withDefaults(
  defineProps<{
    admin: Admin
  }>(),
  {
    admin: () => ({
      name: '',
      sex: '',
      desc: '',
      tags: []
    })
  }
)
</script>
<style lang="scss">
.showBroad {
  width: 30%;
  height: auto;
  background-color: #fff;
  box-shadow: 2px 2px 8px $color-gray-light;
  border-radius: 8px;
  margin-right: 20px;
  @include boxPadding(30px 20px);
  @include flex(column, center);
  font-size: 16px;
  h3 {
    text-align: left;
    width: 80%;
    margin: -6px 0 14px;
  }
  .showBroad {
    &__avatar {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid rgb(184, 255, 175);
    }
    &__name {
      margin: 15px 0 8px;
      font-size: 24px;
    }
    &__tag {
      width: 80%;
      @include flex($ai: center);
      flex-wrap: wrap;
      li {
        margin-right: 10px;
      }
    }
    &__info {
      width: 80%;
      li {
        margin-top: 8px;
        letter-spacing: 1px;
        @include flex($ai: flex-start);
        i {
          margin-right: 6px;
        }
        &:first-child {
          margin-top: 0px;
        }
      }
    }
    &__follow {
      margin: 12px;
    }
  }
}
</style>
