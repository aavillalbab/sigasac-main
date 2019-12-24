import { ApiProperty } from '@nestjs/swagger';

export class ThirdPartyAccountDto {
    @ApiProperty()
    thirdPartyId: number;

    @ApiProperty()
    bankId: number;

    @ApiProperty()
    accountTypeId: number;

    @ApiProperty()
    accountNumber: number;
}
