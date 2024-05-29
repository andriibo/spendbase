import { Inject, Injectable } from '@nestjs/common';
import { IWeatherRepository } from 'domain/repositories';
import { WeatherEntity } from 'domain/entities';
import { IWeatherService } from 'application/modules/weather/services/weather.service';
import { WeatherModel } from 'infrastructure/modules/weather/models';

@Injectable()
export class WeatherService implements IWeatherService {
  constructor(
    @Inject(IWeatherRepository)
    protected readonly weatherRepository: IWeatherRepository,
  ) {}

  async save(lat: number, lon: number, data: object): Promise<WeatherEntity> {
    const weather = new WeatherModel();
    const findModel = await this.weatherRepository.findByParams(lat, lon);
    if (findModel) {
      weather.id = findModel.id;
    }
    weather.lat = lat;
    weather.lon = lon;
    weather.data = data;

    return await this.weatherRepository.save(weather);
  }
}
