import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SchoolStateDto {
    @ApiProperty({ required: true })
    state: number;
}
