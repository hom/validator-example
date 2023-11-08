import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type, TypeHelpOptions } from 'class-transformer';
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

export class ZooDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type((data: TypeHelpOptions) => {
    console.log(data);
    if (data.object.age) return CatDto;
    if (data.object.weight) return DogDto;
  })
  animals: (CatDto | DogDto)[];
}
