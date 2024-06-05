import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpException, Inject } from '@nestjs/common';
import { IWeatherLibrary } from 'application/libraries/weather.library';
import { ConfigService } from '@nestjs/config';

export class OpenWeatherLibrary implements IWeatherLibrary {
  private readonly baseURL: string;
  private readonly appId: string;

  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseURL = this.configService.get<string>('OPEN_WEATHER_HOST');
    this.appId = this.configService.get<string>('OPEN_WEATHER_API_KEY');
  }

  async postCoordinates(lat: number, lon: number, part: string): Promise<any> {
    const uri = `${this.baseURL}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${this.appId}`;

    return await firstValueFrom(
      this.httpService.get(uri).pipe(
        map((axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }),
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );
  }
}
