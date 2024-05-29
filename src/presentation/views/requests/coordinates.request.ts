import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { CoordinatesRequestDto } from 'domain/dto/requests';

export class CoordinatesRequest extends CoordinatesRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  lon: number;

  @ApiProperty()
  @IsNotEmpty()
  part: string;
}
