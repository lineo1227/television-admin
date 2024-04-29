import { defineStore } from "pinia";
interface list {
  id: number;
  name: string;
  path: string;
}
interface MenusState {
  list: list[];
  active: number;
  isShow: boolean;
}
export const useMenusStore = defineStore("menus", {
  state: (): MenusState => ({
    list: [{ id: 5, name: "文件上传", path: "/" }],
    active: 0,
    isShow: false,
  }),
  persist: true,
});
