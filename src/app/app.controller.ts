import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CatDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('cat')
  createCat(@Body() body: CatDto) {
    return this.appService.createCat(body);
  }

  @Post('dog')
  createDog(@Body() body: CatDto) {
    return this.appService.createDog(body);
  }
}
