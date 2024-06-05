import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { CoordinatesRequestDto } from 'domain/dto/requests';
import { Transform, TransformFnParams } from 'class-transformer';
import { MaxLat, MaxLon, MinLat, MinLon } from 'domain/const';

export class CoordinatesRequest extends CoordinatesRequestDto {
  @ApiProperty({ minimum: MinLat, maximum: MaxLat })
  @IsNotEmpty()
  @Min(MinLat)
  @Max(MaxLat)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  lat: number;

  @ApiProperty({ minimum: MinLon, maximum: MaxLon })
  @IsNotEmpty()
  @Min(MinLon)
  @Max(MaxLon)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  lon: number;

  @ApiProperty({ description: 'The part(s) that the application requests.' })
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  part: string;
}
