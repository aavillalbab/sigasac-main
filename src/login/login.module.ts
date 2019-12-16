import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    providers: [LoginService],
    imports: [AuthModule],
    controllers: [LoginController]
})
export class LoginModule {}
