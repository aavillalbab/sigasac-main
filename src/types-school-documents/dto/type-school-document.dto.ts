import { ApiProperty } from '@nestjs/swagger';

export class TypeSchoolDocumentDto {
    @ApiProperty()
    treasuryCode: string;

    @ApiProperty()
    showDate: number;

    @ApiProperty()
    chronologicalOrder: number;

    @ApiProperty()
    typeAdministratorDocumentId: number;

    @ApiProperty({ required: false })
    utilityCenter?: number;

    @ApiProperty()
    voucherId: number;
}
