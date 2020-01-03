import { ApiProperty } from '@nestjs/swagger';

export class ThirdPartyParamIdDto {
    @ApiProperty({ required: false })
    thirdPartyId: number;
}
