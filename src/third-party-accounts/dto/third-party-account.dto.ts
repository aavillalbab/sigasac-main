import { ApiProperty } from '@nestjs/swagger';

export class ThirdPartyAccountDto {
    @ApiProperty()
    bankId: number;

    @ApiProperty()
    accountTypeId: number;

    @ApiProperty()
    accountNumber: number;
}
