import { ApiProperty } from '@nestjs/swagger';

export class SchoolBankAccountDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    accountNumber: string;

    @ApiProperty()
    printCheck: number;

    @ApiProperty()
    accountTypeId: number;

    @ApiProperty()
    singleAccountPlanId: number;

    schoolId: number;
}
