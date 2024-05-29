import { IQueryBus } from '@nestjs/cqrs';
import { PartEnum } from 'domain/enums/part.enum';
import { GetWeatherQuery } from 'application/modules/weather/queries';
import { WeatherResponseDto } from 'domain/dto/responses';
import { NotFoundError } from 'application/errors';

export class GetWeatherUseCase {
  constructor(private readonly queryBus: IQueryBus) {}

  async get(
    lat: number,
    lon: number,
    part: PartEnum,
  ): Promise<WeatherResponseDto> {
    const weather = await this.queryBus.execute(new GetWeatherQuery(lat, lon));

    if (part in weather.data) {
      return weather.data[part];
    }

    throw new NotFoundError('Part not found.');
  }
}
