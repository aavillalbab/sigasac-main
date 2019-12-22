import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { CountryModule } from './country/country.module';
import { LoginModule } from './login/login.module';
import { SchoolModule } from './school/school.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { PeopleTypeModule } from './people-type/people-type.module';
import { ThirdPartyTypesModule } from './third-party-types/third-party-types.module';
import { BankModule } from './bank/bank.module';
import { VoucherModule } from './voucher/voucher.module';
import { RevenueModule } from './revenue/revenue.module';

@Module({
    imports: [
        AuthModule,
        BankModule,
        CountryModule,
        LoginModule,
        SchoolModule,
        ThirdPartyModule,
        ThirdPartyTypesModule,
        PeopleTypeModule,
        VoucherModule,
        RevenueModule
    ]
})
export class AppModule {}
