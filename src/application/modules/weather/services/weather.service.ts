import { WeatherEntity } from 'domain/entities';

export interface IWeatherService {
  save(
    lat: number,
    lon: number,
    data: object,
  ): Promise<WeatherEntity>;
}

export const IWeatherService = Symbol('IWeatherService');
