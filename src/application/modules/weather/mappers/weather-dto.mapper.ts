import { CurrentWeatherResponseDto } from 'domain/dto/responses';

export class WeatherDtoMapper {
  mapWeatherResponseDtoByCurrent(data: any): CurrentWeatherResponseDto {
    const dto = new CurrentWeatherResponseDto();
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
}
