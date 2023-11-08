import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CatDto, DogDto, PetDto, ZooDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('cat')
  createCat(@Body() body: CatDto) {
    return this.appService.createCat(body);
  }

  @Post('dog')
  createDog(@Body() body: DogDto) {
    return this.appService.createDog(body);
  }

  @Post('zoo')
  createZoo(@Body() body: ZooDto) {
    return this.appService.createZoo(body);
  }

  @Post('pet')
  createPet(@Body() body: PetDto) {
    return this.appService.createPet(body);
  }
}
