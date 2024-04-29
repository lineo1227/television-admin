import { createApp } from "vue";
import App from "@/App.vue";
const app = createApp(App);
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { useMenusStore } from "./modules/menusStore";
const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: localStorage,
  })
);
app.use(pinia);
export default app;
export { useMenusStore };
