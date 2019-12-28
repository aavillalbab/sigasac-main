import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
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

import { AuthGuard, User } from 'sigasac-utils';

import { TypesSchoolDocumentsService } from './types-school-documents.service';

import { TypeSchoolDocumentDto } from './dto';
import { ChangeStateDto } from 'src/bank/dto';

@Controller('sigasac/v1/types-school-documents')
@ApiTags('types-school-documents')
@ApiBearerAuth()
export class TypesSchoolDocumentsController {
    constructor(
        private readonly typesSchoolDocumentsService: TypesSchoolDocumentsService
    ) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() typeSchoolDocumentDto: TypeSchoolDocumentDto
    ) {
        try {
            const typeSchoolDocument = await this.typesSchoolDocumentsService.create(
                typeSchoolDocumentDto
            );

            res.status(HttpStatus.CREATED).send({
                typeSchoolDocument
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
    async getAll(@Res() res: Response, @User('schoolId') schoolId: number) {
        try {
            const typesSchoolDocuments = await this.typesSchoolDocumentsService.getAll(
                schoolId
            );

            res.status(HttpStatus.OK).send({
                typesSchoolDocuments
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

    @Put(':typeSchoolDocumentId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('typeSchoolDocumentId')
        typeSchoolDocumentId: number,
        @Body() typeSchoolDocumentDto: TypeSchoolDocumentDto
    ) {
        try {
            await this.typesSchoolDocumentsService.update(
                typeSchoolDocumentId,
                typeSchoolDocumentDto
            );

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

    @Patch(':typeSchoolDocumentId')
    @ApiOperation({})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'))
    async changeState(
        @Res() res: Response,
        @Param('typeSchoolDocumentId')
        typeSchoolDocumentId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.typesSchoolDocumentsService.changeState(
                typeSchoolDocumentId,
                changeStateDto.state
            );

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Cambio de estado exitoso!'
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
