import { ApiProperty } from '@nestjs/swagger';

export class VoucherDto {
    @ApiProperty({ required: false })
    description: string;

    @ApiProperty({ required: false })
    classification: string;

    @ApiProperty({ required: false })
    code: string;

    schoolId: number;
}
