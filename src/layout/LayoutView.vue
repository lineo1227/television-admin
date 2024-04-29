<template>
  <div class="common-layout">
    <div class="menu">
      <SidebarView v-model="menusStore" />
    </div>
    <div class="container">
      <HeaderView :title="list[active].name" />

      <div class="common-content">
        <RouterView v-slot="{ Component }">
          <transition
            :duration="{ leave: 200 }"
            mode="out-in"
            name="fade"
            appear
            appear-active-class="animate__animated animate__backInLeft animate__faster"
            enter-active-class="animate__animated animate__backInLeft animate__faster"
            leave-active-class="animate__animated animate__backOutRight animate__faster"
          >
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderView from "./HeaderView.vue";
import SidebarView from "./SidebarView.vue";
import { useMenusStore } from "@/stores";
import { storeToRefs } from "pinia";
const menusStore = useMenusStore();
const { list, active } = storeToRefs(menusStore);
</script>
<style lang="scss">
.common-layout {
  height: 100vh;
  width: 100vw;
  @include flex(row);

  .menu {
    height: 100%;
    width: 264px;
  }

  .container {
    overflow: hidden;
    flex: 1;
    @include flex(column);
    height: 100%;
  }

  .common-content {
    height: 0;
    flex: 1;
  }
}
</style>
