<template>
  <aside>
    <div class="logo">television-admin</div>
    <ul>
      <li @click="pathTo(index, item)" v-for="(item, index) in menus.list" :key="item.id"
        :class="menus.active === index && 'active'">
        {{ item.name }}
      </li>
    </ul>
  </aside>
</template>
<script setup>
import { defineModel } from "vue";
import { useRouter } from "vue-router";
const menus = defineModel();
const router = useRouter();
const pathTo = (index, item) => {
  menus.value.active = index;
  router.push(item.path);
};
</script>
<style lang="scss">
aside {
  width: 100%;
  height: 100%;
  background-color: #475669;
  box-sizing: border-box;
  border-right: 1px solid $color-light;
  box-shadow: #1f2d3d1a;
  color: #fff;

  .logo {
    height: 56px;
    background-color: #35404f;
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 56px;
  }

  ul {
    margin-top: 23px;
    width: 100%;

    li {
      font-size: 16px;
      margin-top: 6px;
      height: 46px;
      line-height: 26px;
      @include boxPadding(10px 10px 10px 24px);
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        background-color: #f6f9fa0a;
      }

      &.active {
        border-left: #03bf8a 4px solid;
        background-color: #f6f9fa0a;
      }

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
