import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { CoordinatesRequestDto } from 'domain/dto/requests';
import { Transform, TransformFnParams } from 'class-transformer';

export class CoordinatesRequest extends CoordinatesRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  lon: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  part: string;
}
