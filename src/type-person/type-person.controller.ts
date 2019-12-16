import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    Query,
    Patch,
    UseGuards
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { AuthGuard } from 'sigasac-utils';
import { TypePersonService } from './type-person.service';

@Controller('sigasac/v1/type-persons')
@ApiTags('type-persons')
@ApiBearerAuth()
export class TypePersonController {
    constructor(private readonly typePersonService: TypePersonService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Res() res: Response) {
        try {
            const typePersons = await this.typePersonService.getAll();

            res.status(HttpStatus.OK).send({
                typePersons
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }
}
