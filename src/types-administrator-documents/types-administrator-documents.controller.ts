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

import { AuthGuard, MAIN } from 'sigasac-utils';

import { TypesAdministratorDocumentsService } from './types-administrator-documents.service';
import { TypeAdministratorDocumentDto } from './dto';
import { ChangeStateDto } from 'src/bank/dto';

@Controller(`${MAIN.apiBasePath}/${MAIN.subRoutes.typesAdministratorDocuments}`)
@ApiTags(`${MAIN.subRoutes.typesAdministratorDocuments}`)
@ApiBearerAuth()
export class TypesAdministratorDocumentsController {
    constructor(
        private readonly typesAdministratorDocumentsService: TypesAdministratorDocumentsService
    ) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() typeAdministratorDocumentDto: TypeAdministratorDocumentDto
    ) {
        try {
            const typeAdministratorDocument = await this.typesAdministratorDocumentsService.create(
                typeAdministratorDocumentDto
            );

            res.status(HttpStatus.CREATED).send({
                typeAdministratorDocument
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
            const typesAdministratorDocuments = await this.typesAdministratorDocumentsService.getAll();

            res.status(HttpStatus.OK).send({
                typesAdministratorDocuments
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

    @Put(':typeAdministratorDocumentId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('typeAdministratorDocumentId')
        typeAdministratorDocumentId: number,
        @Body() typeAdministratorDocumentDto: TypeAdministratorDocumentDto
    ) {
        try {
            await this.typesAdministratorDocumentsService.update(
                typeAdministratorDocumentId,
                typeAdministratorDocumentDto
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

    @Patch(':typeAdministratorDocumentId')
    @ApiOperation({})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'))
    async changeState(
        @Res() res: Response,
        @Param('typeAdministratorDocumentId')
        typeAdministratorDocumentId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.typesAdministratorDocumentsService.changeState(
                typeAdministratorDocumentId,
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
