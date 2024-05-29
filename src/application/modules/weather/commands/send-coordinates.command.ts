import { ICommand } from '@nestjs/cqrs';

export class SendCoordinatesCommand implements ICommand {
  constructor(
    readonly lat: number,
    readonly lon: number,
    readonly part: string,
  ) {}
}
