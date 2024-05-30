import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { IWeatherRepository } from 'domain/repositories';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeatherModel } from 'infrastructure/modules/weather/models';
import { WeatherModule } from 'infrastructure/modules/weather/weather.module';
import { AppModule } from 'src/app.module';
import { TestModule } from 'tests/test.module';

const mockedWeather = {
  id: '2c5f18d7-e98a-4113-be70-fa679921e812',
  lat: 33.44,
  lon: -94.04,
  data: {
    lat: 33.44,
    lon: -94.04,
    timezone: 'America/Chicago',
    timezone_offset: -18000,
    current: {
      dt: 1717006196,
      sunrise: 1716980901,
      sunset: 1717031958,
      temp: 300.42,
      feels_like: 302.1,
      pressure: 1019,
      humidity: 66,
      dew_point: 293.51,
      uvi: 8.77,
      clouds: 40,
      visibility: 10000,
      wind_speed: 3.6,
      wind_deg: 150,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
    },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('WeatherController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockedWeatherRepository = {
      save: jest.fn(() => Promise.resolve(mockedWeather)),
      findByParams: jest.fn(() => Promise.resolve(mockedWeather)),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TestModule, WeatherModule],
    })
      .overrideProvider(IWeatherRepository)
      .useValue(mockedWeatherRepository)
      .overrideProvider(getRepositoryToken(WeatherModel))
      .useValue(null)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/weather/coordinates (POST) Bad Request', () => {
    return request(app.getHttpServer())
      .post('/weather/coordinates')
      .send({
        lat: 93.44,
        lon: -194.04,
        part: 'daily,hourly,minutely',
      })
      .expect(400);
  });

  it('/weather/coordinates (POST)', () => {
    return request(app.getHttpServer())
      .post('/weather/coordinates')
      .send({
        lat: 33.44,
        lon: -94.04,
        part: 'daily,hourly,minutely',
      })
      .expect(204);
  });

  it('/weather (GET)', () => {
    return request(app.getHttpServer())
      .get('/weather?lat=33.44&lon=-94.04&part=current')
      .expect(200)
      .expect({
        sunrise: mockedWeather.data.current.sunrise,
        sunset: mockedWeather.data.current.sunset,
        temp: mockedWeather.data.current.temp,
        feels_like: mockedWeather.data.current.feels_like,
        pressure: mockedWeather.data.current.pressure,
        humidity: mockedWeather.data.current.humidity,
        uvi: mockedWeather.data.current.uvi,
        wind_speed: mockedWeather.data.current.wind_speed,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
