import { defineStore } from "pinia";
import type { Permission } from "@/types"

interface list {
  id: number;
  name: string;
  path: string;
}
interface tempRouter extends list {
  meta: {
    id: number;
    name: string;
  }
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
  actions: {
    setList(r: tempRouter[], p: Permission) {
      let l = r.map(item => {
        return { id: item.meta.id, name: item.meta.name, path: item.path }
      })
      const names = Object.keys(p)
      const values = Object.values(p)
      for (let i = 0; i < names.length; i++) {
        const name = names[i]
        const value = values[i]
        switch (name) {
          case 'file':
            if (!value.upload) {
              l = l.filter(item => item.id !== 5)
            }
            break;
          default:
            break;
        }
      }
      this.list = l.filter(item => item.id !== 0)
      console.table(p)
    }
  },
  persist: true,
});
