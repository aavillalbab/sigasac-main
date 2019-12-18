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
        phone: user.phone
    };
}
