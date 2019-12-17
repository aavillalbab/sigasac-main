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
import { RevenueService } from './revenue.service';
import { RevenueDto } from './dto';

@Controller('sigasac/v1/revenues')
@ApiTags('revenues')
@ApiBearerAuth()
export class RevenueController {
    constructor(private readonly revenueService: RevenueService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(@Res() res: Response, @Body() revenueDto: RevenueDto) {
        try {
            const revenue = await this.revenueService.create(revenueDto);

            res.status(HttpStatus.CREATED).send({
                revenue
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
            const revenues = await this.revenueService.getAll();

            res.status(HttpStatus.OK).send({
                revenues
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
