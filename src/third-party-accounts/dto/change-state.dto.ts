import { ApiProperty } from '@nestjs/swagger';

export class ChangeStateDto {
    @ApiProperty({ required: true })
    state: number;
}
