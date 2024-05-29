import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IWeatherRepository } from 'domain/repositories';
import { GetWeatherQuery } from 'application/modules/weather/queries';
import { NotFoundError } from 'application/errors';
import { WeatherEntity } from 'domain/entities';

@QueryHandler(GetWeatherQuery)
export class GetWeatherHandler implements IQueryHandler<GetWeatherQuery> {
  constructor(
    @Inject(IWeatherRepository)
    private readonly weatherRepository: IWeatherRepository,
  ) {}

  async execute(query: GetWeatherQuery): Promise<WeatherEntity> {
    const { lat, lon } = query;

    const weather = await this.weatherRepository.findByParams(lat, lon);
    if (!weather) {
      throw new NotFoundError('Weather not found.');
    }

    return weather;
  }
}
