import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SchoolDto {
    @ApiProperty()
    nit: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty({
        required: false
    })
    neighborhood?: string;

    @ApiProperty({
        required: false
    })
    phones?: string;

    @ApiProperty({
        required: false
    })
    fax?: string;

    @ApiProperty({
        required: false
    })
    imagePath?: string;

    @ApiProperty({
        required: false
    })
    cityId?: number;

    @ApiProperty({
        required: false
    })
    comuneId?: number;

    @ApiProperty({
        required: false
    })
    sectorId?: number;
}
