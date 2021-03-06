import {
    Injectable,
    Logger,
    NotFoundException,
    BadRequestException
} from '@nestjs/common';

import { DatabaseProvider, School, User } from 'sigasac-db';
import { AuthService } from 'sigasac-utils';

import { LoginDTO } from './dto';
import { userLogged, userPayload } from './functions';
import { UserPayload } from './interfaces';

@Injectable()
export class LoginService {
    constructor(private readonly authService: AuthService) {}

    async getAuthenticatedUser(loginDTO: LoginDTO) {
        try {
            const user: User = await this.getUserByEmailAndSchool(
                loginDTO.email,
                loginDTO.password,
                loginDTO.schoolId
            );

            const token = await this.authService.signJwt(userPayload(user));

            return {
                user: userLogged(user),
                token
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Devuelve un usuario registrado en el sistema por medio de su correo y asociación con un colegio.
     *
     * @param email correo electrónico
     * @param password contraseña del usuario asociada al email
     * @param schoolId identificador del colegio asociado al email
     */
    private async getUserByEmailAndSchool(
        email: string,
        password: string,
        schoolId: number
    ): Promise<User> {
        try {
            const connection = await DatabaseProvider.getConnection();

            const user: User = await connection
                .getRepository(User)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .innerJoinAndSelect('user.profile', 'profile')
                .where('user.email = :email', { email })
                .andWhere('user.schoolId = :schoolId', { schoolId })
                .getOne();

            if (!user) {
                throw new NotFoundException(
                    `El usuario con correo ${email} no está registrado en nuestro sistema.`
                );
            }

            if (user) {
                if (User.isPassword(user.password, password)) {
                    return user;
                }

                if (!User.isPassword(user.password, password)) {
                    throw new BadRequestException(
                        'email Y/O contraseña incorrectos.'
                    );
                }
            }
        } catch (error) {
            throw error;
        }
    }
}
