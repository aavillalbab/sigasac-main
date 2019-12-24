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
import { RevenueTypeService } from './revenue-type.service';

@Controller('sigasac/v1/revenues-types')
@ApiTags('revenues-types')
@ApiBearerAuth()
export class RevenueTypeController {
    constructor(private readonly revenueTypeService: RevenueTypeService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Res() res: Response) {
        try {
            const revenuesTypes = await this.revenueTypeService.getAll();

            res.status(HttpStatus.OK).send({
                revenuesTypes
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
