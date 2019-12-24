import { ApiProperty } from '@nestjs/swagger';

export class CampusDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;

    schoolId: number;
}
