import { ApiProperty } from '@nestjs/swagger';

export class RevenueDto {
    @ApiProperty({ required: false })
    description: string;

    @ApiProperty({ required: false })
    classification: number;

    @ApiProperty({ required: false })
    code: string;
}
