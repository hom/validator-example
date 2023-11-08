import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  age: number;
}

export class DogDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  weight: number;
}
