import { UserPayload, Payload } from '../interfaces';
import { User } from 'sigasac-db';
import { Logger } from '@nestjs/common';

/**
 * Objeto que se envía cuando un usuario ingresa correctamente a la plataforma.
 *
 * @param user
 * @param modules
 */
export function userLogged(user: User): UserPayload {
    return {
        sub: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
    };
}

/**
 * Objeto para armar el payload para el JWT (token de autenticación).
 *
 * @param user
 */
export function userPayload(user: User): Payload {
    return {
        sub: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: user.profiles[0].description,
        menus: user.profiles[0].menus.map(m => {
            return {
                id: m.id,
                name: m.name,
                permissions: m.permissions.map(p => {
                    return {
                        id: p.id,
                        name: p.name
                    };
                }),
                submenus: m.submenus.map(sm => {
                    return {
                        id: sm.id,
                        name: sm.name,
                        permissions: sm.permissions.map(p => {
                            return {
                                id: p.id,
                                name: p.name
                            };
                        })
                    };
                })
            };
        })
    };
}
