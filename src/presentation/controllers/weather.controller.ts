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
  ApiMethodNotAllowedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { TrimPipe } from 'presentation/pipes';
import { CoordinatesRequest } from 'presentation/views/requests/coordinates.request';
import { WeatherUseCasesFactory } from 'infrastructure/modules/weather/factories';
import { PartEnum } from 'domain/enums/part.enum';
import { WeatherResponseDto } from 'domain/dto/responses';
import { WeatherResponseView } from 'presentation/views/responses';
import { TransformInterceptor } from 'presentation/interceptors';
import { SerializeInterceptor } from 'serialize-interceptor';

@Controller('')
@ApiTags('Weather')
@ApiMethodNotAllowedResponse({ description: 'Method not allowed' })
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
  async postCoordinates(
    @Body(TrimPipe) request: CoordinatesRequest,
  ): Promise<void> {
    const useCase =
      this.weatherUseCasesFactory.createSendCoordinatesUpUseCase();

    await useCase.send(request);
  }

  @Get('weather')
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
  @ApiOkResponse({ type: WeatherResponseView })
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @UseInterceptors(SerializeInterceptor, TransformInterceptor)
  async getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part: PartEnum,
  ): Promise<WeatherResponseDto> {
    const useCase = this.weatherUseCasesFactory.createGetWeatherUseCase();

    return await useCase.get(lat, lon, part);
  }
}
