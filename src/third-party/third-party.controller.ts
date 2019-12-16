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

import { ThirdPartyService } from './third-party.service';
import { ThirdPartyDto } from './dto';

@Controller('sigasac/v1/third-parties')
@ApiTags('third-parties')
@ApiBearerAuth()
export class ThirdPartyController {
    constructor(private readonly thirdPartyService: ThirdPartyService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(@Res() res: Response, @Body() third: ThirdPartyDto) {
        try {
            const t = await this.thirdPartyService.create(third);

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
            const thirdParties = await this.thirdPartyService.getAll();

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
}
