export interface UserPayload {
    /** Id en la tabla de usuarios (users) */
    sub: number;
    name: string;
    email: string;
    phone: string;
}
