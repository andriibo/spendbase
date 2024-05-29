import { ApiProperty } from '@nestjs/swagger';
import { WeatherResponseDto } from 'domain/dto/responses';

export class WeatherResponseView extends WeatherResponseDto {
  @ApiProperty()
  sunrise: number;

  @ApiProperty()
  sunset: number;

  @ApiProperty({ example: 0 })
  temp: number | object;

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
