export interface Permission {
    user: {
        select: boolean,
        change: boolean,
        delete: boolean,
    },
    role: {
        select: boolean,
        change: boolean,
        delete: boolean,
        add: boolean,
    },
    data: {
        select: boolean,
        change: boolean,
        delete: boolean
    },
    file: {
        select: boolean,
        change: boolean,
        delete: boolean,
        upload: boolean,
    }
}