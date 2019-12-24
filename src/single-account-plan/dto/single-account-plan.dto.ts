import { ApiProperty } from '@nestjs/swagger';

export class SingleAccountPlanDto {
    @ApiProperty()
    code: number;

    @ApiProperty()
    description: string;
}
