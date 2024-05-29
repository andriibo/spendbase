import { WeatherEntity } from 'domain/entities';

export interface IWeatherRepository {
  findByParams(lat: number, lon: number): Promise<WeatherEntity>;

  save(data: WeatherEntity): Promise<WeatherEntity>;
}

export const IWeatherRepository = Symbol('IWeatherRepository');
