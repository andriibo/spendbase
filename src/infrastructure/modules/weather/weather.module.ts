import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from 'presentation/controllers/weather.controller';
import { WeatherUseCasesFactory } from 'infrastructure/modules/weather/factories';
import { WeatherModel } from 'infrastructure/modules/weather/models';
import { SendCoordinatesHandler } from 'application/modules/weather/handlers';
import { IWeatherLibrary } from 'application/libraries/weather.library';
import { OpenWeatherLibrary } from 'infrastructure/libraries';
import { IWeatherService } from 'application/modules/weather/services';
import { WeatherService } from 'infrastructure/modules/weather/services';
import { IWeatherRepository } from 'domain/repositories';
import { WeatherRepository } from 'infrastructure/modules/weather/repositories';
import { HttpModule } from '@nestjs/axios';
import { GetWeatherHandler } from 'application/modules/weather/handlers/get-weather.handler';
import { WeatherDtoMapper } from 'application/modules/weather/mappers';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([WeatherModel]), ConfigModule],
  controllers: [WeatherController],
  providers: [
    WeatherUseCasesFactory,
    SendCoordinatesHandler,
    GetWeatherHandler,
    WeatherDtoMapper,
    {
      provide: IWeatherLibrary,
      useClass: OpenWeatherLibrary,
    },
    {
      provide: IWeatherRepository,
      useClass: WeatherRepository,
    },
    {
      provide: IWeatherService,
      useClass: WeatherService,
    },
  ],
})
export class WeatherModule {}
