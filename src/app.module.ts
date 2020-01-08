import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { AccountsTypesModule } from './accounts-types/accounts-types.module';
import { BankModule } from './bank/bank.module';
import { CampusModule } from './campus/campus.module';
import { CountryModule } from './country/country.module';
import { LoginModule } from './login/login.module';
import { NatureDocumentsModule } from './nature-documents/nature-documents.module';
import { SchoolModule } from './school/school.module';
import { SchoolBankAccountsModule } from './school-bank-accounts/school-bank-accounts.module';
import { SingleAccountPlanModule } from './single-account-plan/single-account-plan.module';
import { PeopleTypeModule } from './people-type/people-type.module';
import { ProjectsModule } from './projects/projects.module';
import { RegimeModule } from './regime/regime.module';
import { RevenueTypeModule } from './revenue-type/revenue-type.module';
import { RevenueModule } from './revenue/revenue.module';
import { ThirdPartyTypesModule } from './third-party-types/third-party-types.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { VoucherModule } from './voucher/voucher.module';
import { ThirdPartyAccountsModule } from './third-party-accounts/third-party-accounts.module';
import { BudgetAccountsModule } from './budget-accounts/budget-accounts.module';
import { TypesAdministratorDocumentsModule } from './types-administrator-documents/types-administrator-documents.module';
import { TypesSchoolDocumentsModule } from './types-school-documents/types-school-documents.module';
import { BudgetsModule } from './budgets/budgets.module';

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
        SchoolBankAccountsModule,
        SingleAccountPlanModule,
        ThirdPartyModule,
        ThirdPartyTypesModule,
        VoucherModule,
        ThirdPartyAccountsModule,
        BudgetAccountsModule,
        TypesAdministratorDocumentsModule,
        TypesSchoolDocumentsModule,
        BudgetsModule
    ]
})
export class AppModule {}
