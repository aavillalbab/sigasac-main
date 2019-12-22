import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({required: false})
    schoolId?: number;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
