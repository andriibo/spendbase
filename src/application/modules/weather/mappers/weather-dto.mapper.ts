import { WeatherResponseDto } from 'domain/dto/responses';

export class WeatherDtoMapper {
  mapWeatherResponseDtoByCurrent(data: any): WeatherResponseDto {
    const dto = new WeatherResponseDto();
    dto.sunrise = data.sunrise;
    dto.sunset = data.sunset;
    dto.temp = data.temp;
    dto.feelsLike = data.feels_like;
    dto.pressure = data.pressure;
    dto.humidity = data.humidity;
    dto.uvi = data.uvi;
    dto.windSpeed = data.wind_speed;

    return dto;
  }

  mapWeatherResponseDtosByDaily(data: any): WeatherResponseDto[] {
    return data.map((item) => {
      const dto = new WeatherResponseDto();
      dto.dt = item.dt;
      dto.sunrise = item.sunrise;
      dto.sunset = item.sunset;
      dto.temp = item.temp;
      dto.feelsLike = item.feels_like;
      dto.pressure = item.pressure;
      dto.humidity = item.humidity;
      dto.uvi = item.uvi;
      dto.windSpeed = item.wind_speed;

      return dto;
    });
  }

  mapWeatherResponseDtosByHourly(data: any): WeatherResponseDto[] {
    return data.map((item) => {
      const dto = new WeatherResponseDto();
      dto.dt = item.dt;
      dto.temp = item.temp;
      dto.feelsLike = item.feels_like;
      dto.pressure = item.pressure;
      dto.humidity = item.humidity;
      dto.uvi = item.uvi;
      dto.windSpeed = item.wind_speed;

      return dto;
    });
  }
}
