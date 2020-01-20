import {
    Injectable,
    Logger,
    NotFoundException,
    BadRequestException
} from '@nestjs/common';

import {
    DatabaseProvider,
    School,
    User,
    SchoolProfileUser,
    Profile,
    UserLog
} from 'sigasac-db';
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
        schoolId?: number
    ): Promise<User> {
        try {
            const SchoolCondition = schoolId
                ? `schools.id = ${schoolId}`
                : 'schools.id IS NULL';

            const connection = await DatabaseProvider.getConnection();

            const user: User = await connection
                .getRepository(User)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .leftJoinAndSelect('user.profiles', 'profiles')
                .leftJoinAndSelect('profiles.menus', 'menus')
                .leftJoinAndSelect('menus.permissions', 'permissions')
                .leftJoinAndSelect(
                    'menus.menuPermissionProfile',
                    'mpp',
                    'mpp.profileId = profiles.id'
                )
                .leftJoinAndSelect('menus.submenus', 'submenus')
                .leftJoinAndSelect('submenus.permissions', '_permissions')
                .leftJoinAndSelect(
                    'submenus.menuPermissionProfile',
                    'smpp',
                    'smpp.profileId = profiles.id'
                )
                .leftJoinAndSelect(
                    'submenus.profiles',
                    '_profiles',
                    '_profiles.id = profiles.id'
                )
                .leftJoinAndSelect('user.schools', 'schools')
                .where('user.email = :email', { email })
                .andWhere('user.state = :state', { state: 1 })
                .andWhere(SchoolCondition)
                .andWhere('menus.father IS NULL')
                .orderBy('menus.id', 'ASC')
                .getOne();
            // Logger.log(user.profiles[0].menus[0])
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

            if (!user) {
                throw new NotFoundException(
                    `El usuario con correo ${email} no está registrado en nuestro sistema.`
                );
            }
        } catch (error) {
            throw error;
        }
    }

    async addLoggerUser(userId: number, from: string) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const lastLogin = new Date().toLocaleString();

            const userLog = await connection
                .getRepository(UserLog)
                .findOne({ where: { userId } });

            if (userLog) {
                userLog.lastLogin = lastLogin;
                userLog.from = from;
                await connection.getRepository(UserLog).save(userLog);
            }

            if (!userLog) {
                await connection
                    .getRepository(UserLog)
                    .save({ userId, lastLogin, from });
            }
        } catch (error) {
            throw error;
        }
    }
}
