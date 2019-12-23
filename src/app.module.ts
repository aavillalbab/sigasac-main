import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { AccountsTypesModule } from './accounts-types/accounts-types.module';
import { BankModule } from './bank/bank.module';
import { CampusModule } from './campus/campus.module';
import { CountryModule } from './country/country.module';
import { LoginModule } from './login/login.module';
import { NatureDocumentsModule } from './nature-documents/nature-documents.module';
import { SchoolModule } from './school/school.module';
import { PeopleTypeModule } from './people-type/people-type.module';
import { ProjectsModule } from './projects/projects.module';
import { RegimeModule } from './regime/regime.module';
import { RevenueTypeModule } from './revenue-type/revenue-type.module';
import { RevenueModule } from './revenue/revenue.module';
import { ThirdPartyTypesModule } from './third-party-types/third-party-types.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
    imports: [
        AuthModule,
        AccountsTypesModule,
        BankModule,
        CampusModule,
        CountryModule,
        LoginModule,
        NatureDocumentsModule,
        PeopleTypeModule,
        ProjectsModule,
        RegimeModule,
        RevenueTypeModule,
        RevenueModule,
        SchoolModule,
        ThirdPartyModule,
        ThirdPartyTypesModule,
        VoucherModule
    ]
})
export class AppModule {}
