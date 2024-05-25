import { createRouter, createWebHashHistory } from "vue-router";
import { useMenusStore, useRoleStore } from "@/stores";
import FileUpload from "@/views/FileUpload/FileUpload.vue";
import Login from "@/views/Login/Login.vue";
import InformationManagement from "@/views/InformationManagement/InformationManagement.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        id: 0,
        name: "用户登录",
      },
      component: Login,
    },
    {
      path: "/",
      name: "upload",
      meta: {
        id: 5,
        name: "文件上传",
      },
      component: FileUpload,
    },
    {
      path: "/info",
      name: "info",
      meta: {
        id: 4,
        name: "信息管理",
      },
      component: InformationManagement,
    },

  ],
});
const menusStore = useMenusStore();
const roleStore = useRoleStore()
menusStore.setList(router.getRoutes() as any, roleStore.permission)
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    if (menusStore.isShow) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
