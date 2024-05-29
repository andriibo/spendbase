import { ICommandBus } from '@nestjs/cqrs';
import { CoordinatesRequestDto } from 'domain/dto/requests';
import { SendCoordinatesCommand } from 'application/modules/weather/commands';

export class SendCoordinatesUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async send(dto: CoordinatesRequestDto): Promise<void> {
    await this.commandBus.execute(
      new SendCoordinatesCommand(dto.lat, dto.lon, dto.part),
    );
  }
}
