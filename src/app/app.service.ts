import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createCat(body) {
    console.log(body);
  }

  createDog(body) {
    console.log(body);
  }

  createZoo(body) {
    console.log(body);
  }
}
