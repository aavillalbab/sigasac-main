interface Permission {
    id: number;
    name: string;
}

interface Menu {
    id: number;
    name: string;
    permissions: Permission[];
}

export interface Payload {
    /** Id en la tabla de usuarios (users) */
    sub: number;
    name: string;
    email: string;
    phone: string;
    profile: string;
    menus: Menu[];
}
