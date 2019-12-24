interface Permission {
    id: number;
    name: string;
}

interface SubMenu {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Menu {
    id: number;
    name: string;
    permissions: Permission[];
    submenus: SubMenu[];
}

export interface Payload {
    /** Id en la tabla de usuarios (users) */
    sub: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    schoolId: number;
    menus: Menu[];
}
