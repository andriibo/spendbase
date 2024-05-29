import { IQuery } from '@nestjs/cqrs';
import { PartEnum } from 'domain/enums/part.enum';

export class GetWeatherQuery implements IQuery {
  constructor(
    readonly lat: number,
    readonly lon: number,
  ) {}
}
