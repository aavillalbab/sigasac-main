import { ApiProperty } from '@nestjs/swagger';

export class ThirdPartyDto {
    @ApiProperty({ required: false })
    code?: string;

    @ApiProperty({ required: false })
    businessName?: string;

    @ApiProperty({ required: false })
    surname?: string;

    @ApiProperty({ required: false })
    surname2?: string;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    name2?: string;

    @ApiProperty({ required: false })
    phones?: string;

    @ApiProperty({ required: false })
    cellphone?: string;

    @ApiProperty({ required: false })
    fax?: string;

    @ApiProperty({ required: false })
    postalCode?: string;

    @ApiProperty({ required: false })
    address?: string;

    @ApiProperty({ required: false })
    documentNumber?: string;

    @ApiProperty({ required: false })
    publicEntity?: string;

    @ApiProperty({ required: false })
    vatRegime?: string;

    @ApiProperty({ required: false })
    declareIncome?: number;

    @ApiProperty({ required: false })
    isWithholdingAgent?: number;

    @ApiProperty({ required: false })
    isGreatContributor?: number;

    @ApiProperty({ required: false })
    isSelfRetainer?: number;

    @ApiProperty({ required: false })
    vatInvoice?: number;

    @ApiProperty({ required: false })
    retentionEffect?: number;

    @ApiProperty({ required: false })
    documentTypeId?: number;

    @ApiProperty({ required: false })
    typePersonId?: number;

    @ApiProperty({ required: false })
    thirdPartyTypeId?: number;

    schoolId: number;
}
