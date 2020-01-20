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
        name: user.name,
        email: user.email,
        phone: user.phone,
        lastLogin: user.userLog.lastLogin,
        from: user.userLog.from
    };
}

/**
 * Objeto para armar el payload para el JWT (token de autenticación).
 *
 * @param user
 */
export function userPayload(user: User): Payload {
    const userPayload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.profiles[0].description,
        schoolId: user.schools.length ? user.schools[0].id : null,
        menus: user.profiles[0].menus.map(m => {
            return {
                id: m.id,
                name: m.name,
                permissions: m.permissions
                    .map(p => {
                        return { id: p.id, name: p.name };
                    })
                    .filter(p =>
                        m.menuPermissionProfile.some(
                            mpp => p.id === mpp.permissionId
                        )
                    ),
                submenus: m.submenus
                    .filter(sm => sm.profiles.length)
                    .map(sm => {
                        return {
                            id: sm.id,
                            name: sm.name,
                            permissions: sm.permissions
                                .map(p => {
                                    return { id: p.id, name: p.name };
                                })
                                .filter(p =>
                                    sm.menuPermissionProfile.some(
                                        mpp => p.id === mpp.permissionId
                                    )
                                )
                        };
                    })
            };
        })
    };
    // Logger.log(userPayload)
    return userPayload;
}
