import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendCoordinatesCommand } from 'application/modules/weather/commands';
import { Inject } from '@nestjs/common';
import { IWeatherLibrary } from 'application/libraries/weather.library';
import { IWeatherService } from 'application/modules/weather/services';
import { IWeatherRepository } from "domain/repositories";

@CommandHandler(SendCoordinatesCommand)
export class SendCoordinatesHandler
  implements ICommandHandler<SendCoordinatesCommand>
{
  constructor(
    @Inject(IWeatherLibrary)
    private readonly weatherLibrary: IWeatherLibrary,
    @Inject(IWeatherService)
    private readonly weatherService: IWeatherService,
    @Inject(IWeatherRepository)
    private readonly weatherRepository: IWeatherRepository,
  ) {}

  async execute(command: SendCoordinatesCommand): Promise<void> {
    const { lon, lat, part } = command;
    const weather = await this.weatherLibrary.postCoordinates(lat, lon, part);

    await this.weatherService.save(lat, lon, weather);
  }
}
