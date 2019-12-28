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
import { ThirdPartyTypesService } from './third-party-types.service';
import { ThirdPartyTypeDto } from './dto';

@Controller(`${MAIN.apiBasePath}/${MAIN.subRoutes.thirdPartyTypes}`)
@ApiTags(`${MAIN.subRoutes.thirdPartyTypes}`)
@ApiBearerAuth()
export class ThirdPartyTypesController {
    constructor(
        private readonly thirdPartyTypeService: ThirdPartyTypesService
    ) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(@Res() res: Response, @Body() third: ThirdPartyTypeDto) {
        try {
            const t = await this.thirdPartyTypeService.create(third);

            res.status(HttpStatus.CREATED).send({
                thirdParties: t
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

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Res() res: Response) {
        try {
            const thirdParties = await this.thirdPartyTypeService.getAll();

            res.status(HttpStatus.OK).send({
                thirdParties
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

    @Put(':thirdPartyId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('thirdPartyId') thirdPartyId: number,
        @Body() third: ThirdPartyTypeDto
    ) {
        try {
            await this.thirdPartyTypeService.update(thirdPartyId, third);

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Actualización exitosa!'
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
