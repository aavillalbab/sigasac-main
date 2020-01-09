import { ApiProperty } from '@nestjs/swagger';

export class BudgetNoteDto {
    schoolId: number;

    @ApiProperty({ required: false })
    code: string;

    @ApiProperty()
    noteDate: string;

    @ApiProperty()
    conceptId: number;

    @ApiProperty({ required: false })
    subconceptId: number;

    @ApiProperty({ required: false })
    thirdPartyId: number;
}
