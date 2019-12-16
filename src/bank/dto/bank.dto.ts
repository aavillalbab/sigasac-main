import { ApiProperty } from '@nestjs/swagger';

export class BankDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;
}
