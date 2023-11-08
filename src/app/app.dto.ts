import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  // Transform,
  Type,
  TypeHelpOptions,
  // plainToInstance,
} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class CatDto extends BaseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEnum(['cat'])
  type: 'cat';

  @ApiProperty()
  @IsNumber()
  @Min(0)
  age: number;
}

export class DogDto extends BaseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEnum(['dog'])
  type: 'dog';

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
  // @Type((data: TypeHelpOptions) => {
  //   const { object, property } = data;
  //   console.log(
  //     '🚀 ~ file: app.dto.ts:45 ~ ZooDto ~ @Type ~ property:',
  //     property,
  //   );
  //   console.log('🚀 ~ file: app.dto.ts:45 ~ ZooDto ~ @Type ~ object:', object);
  //   return CatDto;
  // })
  @Type(() => BaseDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: CatDto, name: 'cat' },
        { value: DogDto, name: 'dog' },
      ],
    },
  })
  // @Transform(
  //   (object) => {
  //     console.log('🚀 ~ file: app.dto.ts:54 ~ ZooDto ~ object:', object);
  //     const { value } = object;
  //     console.log(
  //       '🚀 ~ file: app.dto.ts:53 ~ ZooDto ~ @Transform ~ value:',
  //       value,
  //     );
  //     return value.map((item) => {
  //       if (item.type === 'cat') return plainToInstance(CatDto, item);
  //       if (item.type === 'dog') return plainToInstance(DogDto, item);
  //     });
  //   },
  //   // { toClassOnly: true },
  // )
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
