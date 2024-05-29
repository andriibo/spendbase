import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { PartEnum } from 'domain/enums';
import { WeatherDtoMapper } from 'application/modules/weather/mappers';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest() as Request;
        const part = req.query.part;

        if (part == PartEnum.Current) {
          const mapper = new WeatherDtoMapper();

          return mapper.mapWeatherResponseDtoByCurrent(data);
        }

        if (part == PartEnum.Daily) {
          const mapper = new WeatherDtoMapper();

          return mapper.mapWeatherResponseDtosByDaily(data);
        }

        if (part == PartEnum.Hourly) {
          const mapper = new WeatherDtoMapper();

          return mapper.mapWeatherResponseDtosByHourly(data);
        }

        return data;
      }),
    );
  }
}
