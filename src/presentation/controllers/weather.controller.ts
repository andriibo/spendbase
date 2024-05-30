import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CoordinatesRequest } from 'presentation/views/requests/coordinates.request';
import { WeatherUseCasesFactory } from 'infrastructure/modules/weather/factories';
import { PartEnum } from 'domain/enums/part.enum';
import { CurrentWeatherResponseView } from 'presentation/views/responses';
import { SerializeInterceptor } from 'serialize-interceptor';
import { CurrentWeatherResponseDto } from 'domain/dto/responses';

@Controller('weather')
@ApiTags('Weather')
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiNotFoundResponse({ description: 'Not found' })
@ApiBadRequestResponse({ description: 'Bad request' })
export class WeatherController {
  constructor(
    private readonly weatherUseCasesFactory: WeatherUseCasesFactory,
  ) {}

  @Post('coordinates')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'No content' })
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  async postCoordinates(@Body() request: CoordinatesRequest): Promise<void> {
    const useCase =
      this.weatherUseCasesFactory.createSendCoordinatesUpUseCase();

    await useCase.send(request);
  }

  @Get('')
  @ApiQuery({
    name: 'lat',
    type: 'number',
  })
  @ApiQuery({
    name: 'lon',
    type: 'number',
  })
  @ApiQuery({
    name: 'part',
    enum: PartEnum,
    type: 'enum',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CurrentWeatherResponseView })
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @UseInterceptors(SerializeInterceptor)
  async getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part: PartEnum,
  ): Promise<CurrentWeatherResponseDto> {
    const useCase = this.weatherUseCasesFactory.createGetWeatherUseCase();

    return await useCase.get(lat, lon, part);
  }
}
