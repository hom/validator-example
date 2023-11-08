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
    const { object, property } = data;
    console.log(
      '🚀 ~ file: app.dto.ts:45 ~ ZooDto ~ @Type ~ property:',
      property,
    );
    console.log('🚀 ~ file: app.dto.ts:45 ~ ZooDto ~ @Type ~ object:', object);
    return CatDto;
  })
  animals: (CatDto | DogDto)[];
}

export class PetDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type((data: TypeHelpOptions) => {
    const { object, property } = data;
    console.log(
      '🚀 ~ file: app.dto.ts:45 ~ ZooDto ~ @Type ~ property:',
      property,
    );
    console.log('🚀 ~ file: app.dto.ts:45 ~ ZooDto ~ @Type ~ object:', object);
    if (object[property].age) return CatDto;
    if (object[property].weight) return DogDto;
    return CatDto;
  })
  animal: CatDto | DogDto;
}
