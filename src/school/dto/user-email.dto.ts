import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UserEmailDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    email?: string;
}
