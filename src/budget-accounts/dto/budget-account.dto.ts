import { ApiProperty } from '@nestjs/swagger';

export class BudgetAccountDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    description: string;
}
