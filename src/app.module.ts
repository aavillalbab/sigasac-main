import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { CountryModule } from './country/country.module';
import { LoginModule } from './login/login.module';
import { SchoolModule } from './school/school.module';

@Module({
    imports: [AuthModule, CountryModule, LoginModule, SchoolModule]
})
export class AppModule {}
