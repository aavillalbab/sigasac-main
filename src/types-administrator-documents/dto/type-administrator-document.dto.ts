import { ApiProperty } from '@nestjs/swagger';

export class TypeAdministratorDocumentDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    natureDocumentId: number;
}
