import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    schoolId: number;
}
