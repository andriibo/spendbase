import { ApiProperty } from '@nestjs/swagger';
import { CurrentWeatherResponseDto } from 'domain/dto/responses';

export class CurrentWeatherResponseView extends CurrentWeatherResponseDto {
  @ApiProperty()
  sunrise: number;

  @ApiProperty()
  sunset: number;

  @ApiProperty()
  temp: number;

  @ApiProperty({ name: 'feels_like' })
  feelsLike: number;

  @ApiProperty()
  pressure: number;

  @ApiProperty()
  humidity: number;

  @ApiProperty()
  uvi: number;

  @ApiProperty({ name: 'wind_speed' })
  windSpeed: number;
}
