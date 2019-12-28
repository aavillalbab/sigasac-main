import { ApiProperty } from '@nestjs/swagger';

export class SingleAccountPlanDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    description: string;
}
