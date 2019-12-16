import { ApiProperty } from '@nestjs/swagger';

export class ThirdPartyTypeDto {
    @ApiProperty()
    description: string;
}
