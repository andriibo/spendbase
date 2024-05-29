export class WeatherResponseDto {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  temp: number | object;
  feelsLike: number | object;
  pressure: number;
  humidity: number;
  uvi: number;
  windSpeed: number;
}
