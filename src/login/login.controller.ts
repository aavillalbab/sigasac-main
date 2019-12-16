import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Get,
    Query,
    Req,
    UseGuards,
    Logger
} from '@nestjs/common';

import { Request, Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { AuthGuard } from 'sigasac-utils';

import { LoginService } from './login.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('login')
@Controller('sigasac/v1')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('/login')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    async login(@Res() res: Response, @Body() loginDTO: LoginDTO) {
        try {
            const user = await this.loginService.getAuthenticatedUser(loginDTO);

            res.status(HttpStatus.OK).send(user);
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

    @Get('whoami')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({})
    getProfile(@Req() req: Request, @Res() res: Response) {
        try {
            res.status(HttpStatus.OK).send({
                user: req.user
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
