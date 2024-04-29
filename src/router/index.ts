import { createRouter, createWebHashHistory } from "vue-router";
import { useMenusStore } from "@/stores";
import FileUpload from "@/views/FileUpload/FileUpload.vue";
import Login from "@/views/Login/Login.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "upload",
      component: FileUpload,
    },
  ],
});
const store = useMenusStore();
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    if (store.isShow) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
