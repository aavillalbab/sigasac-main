import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountriesService } from './country.service';

@Module({
    controllers: [CountryController],
    providers: [CountriesService]
})
export class CountryModule {}
