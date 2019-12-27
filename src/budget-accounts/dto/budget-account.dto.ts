import { ApiProperty } from '@nestjs/swagger';

export class BudgetAccountDto {
    @ApiProperty()
    code: number;

    @ApiProperty()
    description: string;
}
