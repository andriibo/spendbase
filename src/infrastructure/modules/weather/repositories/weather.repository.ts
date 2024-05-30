import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IWeatherRepository } from 'domain/repositories';
import { WeatherEntity } from 'domain/entities';
import { WeatherModel } from 'infrastructure/modules/weather/models';

@Injectable()
export class WeatherRepository implements IWeatherRepository {
  constructor(
    @InjectRepository(WeatherModel)
    private readonly repository: Repository<WeatherModel>,
  ) {}

  async findByParams(lat: number, lon: number): Promise<WeatherEntity> {
    return await this.repository.findOneBy({ lat, lon });
  }

  async save(data: WeatherModel): Promise<WeatherEntity> {
    return await this.repository.save(data);
  }
}
