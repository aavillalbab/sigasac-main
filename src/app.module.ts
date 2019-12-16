import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { CountryModule } from './country/country.module';
import { LoginModule } from './login/login.module';
import { SchoolModule } from './school/school.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { TypePersonModule } from './type-person/type-person.module';
import { ThirdPartyTypesModule } from './third-party-types/third-party-types.module';

@Module({
    imports: [
        AuthModule,
        CountryModule,
        LoginModule,
        SchoolModule,
        ThirdPartyModule,
        TypePersonModule,
        ThirdPartyTypesModule
    ]
})
export class AppModule {}
