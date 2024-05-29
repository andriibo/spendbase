import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SendCoordinatesUseCase } from 'application/modules/weather/use-cases';
import { GetWeatherUseCase } from 'application/modules/weather/use-cases/get-weather.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherUseCasesFactory {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createSendCoordinatesUpUseCase(): SendCoordinatesUseCase {
    return new SendCoordinatesUseCase(this.commandBus);
  }

  createGetWeatherUseCase(): GetWeatherUseCase {
    return new GetWeatherUseCase(this.queryBus);
  }
}
