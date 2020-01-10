import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    UseGuards,
    Patch
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth,
    ApiBody
} from '@nestjs/swagger';

import { AuthGuard, User, MAIN } from 'sigasac-utils';

import { BudgetNotesService } from './budget-notes.service';
import { BudgetNoteDto, BudgetNoteDetailDto } from './dto';

@Controller(`${MAIN.apiBasePath}/${MAIN.subRoutes.budgetNotes}`)
@ApiTags(`${MAIN.subRoutes.budgetNotes}`)
@ApiBearerAuth()
export class BudgetNotesController {
    constructor(private readonly budgetNotesService: BudgetNotesService) {}

    @Post()
    @ApiBody({ type: BudgetNoteDto })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() budgetNoteDto: BudgetNoteDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            budgetNoteDto.schoolId = schoolId;

            const budgetNote = await this.budgetNotesService.create(
                budgetNoteDto
            );

            res.status(HttpStatus.CREATED).send({
                budgetNote
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

    @Post('/details')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async createBudgetNoteDetail(
        @Res() res: Response,
        @Body() budgetNoteDetailDto: BudgetNoteDetailDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            const budgetNoteDetail = await this.budgetNotesService.createBudgetNoteDetail(
                budgetNoteDetailDto
            );

            res.status(HttpStatus.CREATED).send({
                budgetNoteDetail
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
            const budgetNotes = await this.budgetNotesService.getAll(schoolId);

            res.status(HttpStatus.OK).send({
                budgetNotes
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

    @Get(':budgetNoteId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(
        @Res() res: Response,
        @User('schoolId') schoolId: number,
        @Param('budgetNoteId') budgetNoteId: number
    ) {
        try {
            const budgetNotes = await this.budgetNotesService.getById(
                schoolId,
                budgetNoteId
            );

            res.status(HttpStatus.OK).send({
                budgetNotes
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

    @Get(':budgetNoteId/details')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getAllBudgetNoteDetail(
        @Res() res: Response,
        @User('schoolId') schoolId: number,
        @Param('budgetNoteId') budgetNoteId: number
    ) {
        try {
            const budgetNotes = await this.budgetNotesService.getAllBudgetNoteDetail(
                schoolId,
                budgetNoteId
            );

            res.status(HttpStatus.OK).send({
                budgetNotes
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

    @Put(':budgetNoteId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('budgetNoteId') budgetNoteId: number,
        @Body() budgetNoteDto: BudgetNoteDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.budgetNotesService.update(
                schoolId,
                budgetNoteId,
                budgetNoteDto
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

    @Put(':budgetNoteId/details/:budgetNoteDetailId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async updateBudgetNoteDetail(
        @Res() res: Response,
        @Param('budgetNoteId') budgetNoteId: number,
        @Param('budgetNoteDetailId') budgetNoteDetailId: number,
        @Body() budgetNoteDetailDto: BudgetNoteDetailDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.budgetNotesService.updateBudgetNoteDetail(
                schoolId,
                budgetNoteId,
                budgetNoteDetailId,
                budgetNoteDetailDto
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
}
