<script setup>
import LayoutView from "@/layout/LayoutView.vue";
import { useMenusStore } from "./stores";
const store = useMenusStore();
</script>

<template>
  <div>
    <LayoutView v-if="store.isShow" />
    <transition
      v-else
      appear-active-class="animate__animated animate__backInLeft animate__faster"
      enter-active-class="animate__animated animate__backInLeft animate__faster"
      leave-active-class="animate__animated animate__backOutRight animate__faster"
    >
      <router-view />
    </transition>
  </div>
</template>

<style scoped></style>
