export class CurrentWeatherResponseDto {
  sunrise: number;
  sunset: number;
  temp: number;
  feelsLike: number | object;
  pressure: number;
  humidity: number;
  uvi: number;
  windSpeed: number;
}
