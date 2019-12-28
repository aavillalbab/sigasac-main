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

import { AuthGuard, MAIN } from 'sigasac-utils';
import { PeopleTypeService } from './people-type.service';

@Controller(`${MAIN.apiBasePath}/${MAIN.subRoutes.typesPeople}`)
@ApiTags(`${MAIN.subRoutes.typesPeople}`)
@ApiBearerAuth()
export class PeopleTypeController {
    constructor(private readonly typePersonService: PeopleTypeService) {}

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
