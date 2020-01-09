import { ApiProperty } from '@nestjs/swagger';

export class BudgetNoteDetailDto {
    @ApiProperty()
    value: number;

    @ApiProperty()
    budgetNoteId: number;

    @ApiProperty({ required: false })
    budgetAccountId: number;

    @ApiProperty({ required: false })
    campusId: number;

    @ApiProperty({ required: false })
    revenueId: number;

    @ApiProperty({ required: false })
    projectId: number;
}
