import type { Permission } from "@/types"
import { defineStore } from "pinia";

export const useRoleStore = defineStore("role", {
    state: (): { permission: Permission } => ({
        permission: {
            user: {
                select: false,
                change: false,
                delete: false,
            },
            role: {
                select: false,
                change: false,
                delete: false,
                add: false,
            },
            data: {
                select: true,
                change: false,
                delete: false
            },
            file: {
                select: false,
                change: false,
                delete: false,
                upload: true,
            }
        },
    }),
    persist: true,
});