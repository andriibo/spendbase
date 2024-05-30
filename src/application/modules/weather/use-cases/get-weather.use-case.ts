import { IQueryBus } from '@nestjs/cqrs';
import { PartEnum } from 'domain/enums/part.enum';
import { GetWeatherQuery } from 'application/modules/weather/queries';
import { NotFoundError } from 'application/errors';
import { WeatherDtoMapper } from 'application/modules/weather/mappers';
import { CurrentWeatherResponseDto } from 'domain/dto/responses';

export class GetWeatherUseCase {
  constructor(
    private readonly queryBus: IQueryBus,
    private readonly weatherDtoMapper: WeatherDtoMapper,
  ) {}

  async get(
    lat: number,
    lon: number,
    part: PartEnum,
  ): Promise<CurrentWeatherResponseDto> {
    const weather = await this.queryBus.execute(new GetWeatherQuery(lat, lon));

    if (!weather.data.hasOwnProperty(PartEnum.Current)) {
      throw new NotFoundError('Current not found.');
    }

    return this.weatherDtoMapper.mapWeatherResponseDtoByCurrent(
      weather.data[PartEnum.Current],
    );
  }
}
