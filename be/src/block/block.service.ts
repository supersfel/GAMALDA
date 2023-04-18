import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockService {
  getHelloWorld(): string {
    return 'Hello World!!';
  }
}
