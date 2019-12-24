import { Controller, Res, HttpStatus, Get, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'sigasac-utils';
import { NatureDocumentsService } from './nature-documents.service';

@Controller('sigasac/v1/nature-documents')
@ApiBearerAuth()
@ApiTags('nature-documents')
export class NatureDocumentsController {
    constructor(private readonly natureDocumentsService: NatureDocumentsService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(@Res() res: Response) {
        try {
            const natureDocuments = await this.natureDocumentsService.getAll();

            res.status(HttpStatus.OK).send({
                natureDocuments
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
