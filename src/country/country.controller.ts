import {
    Controller,
    Get,
    UseGuards,
    Res,
    HttpStatus,
    Param
} from '@nestjs/common';

import { Request, Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { AuthGuard, RolesGuard, User, Roles } from 'sigasac-utils';

import { CountriesService } from './country.service';
import { Country, Department, Town } from 'sigasac-db';

@ApiTags('country')
@ApiBearerAuth()
@Controller('sigasac/v1/countries')
export class CountryController {
    constructor(private readonly CountriesService: CountriesService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt') /* RolesGuard */)
    // @Roles()
    async findAll(@Res() res: Response, @User() user: any) {
        try {
            const countries: Country[] = await this.CountriesService.findAll();

            res.status(HttpStatus.OK).send(countries);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message
            });
        }
    }

    @Get(`:countryCode/departments`)
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt') /* RolesGuard */)
    // @Roles()
    async getDepartmentByCodeCountry(
        @Res() res: Response,
        @Param('countryCode') countryCode: number,
        @User() user: any
    ) {
        try {
            const departments: Department[] = await this.CountriesService.getDepartmentByCodeCountry(
                countryCode
            );

            res.status(HttpStatus.OK).send(departments);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message
            });
        }
    }

    @Get(`departments/:departmentCode/towns`)
    // @Roles()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getTownsByCodeDepartment(
        @Res() res: Response,
        @Param('departmentCode') departmentCode: number
    ) {
        try {
            const towns: Town[] = await this.CountriesService.getTownsByCodeDepartment(
                departmentCode
            );

            res.status(HttpStatus.OK).send(towns);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message
            });
        }
    }
}
