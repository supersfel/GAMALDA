import { Controller, Get } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  getHelloWorld(): string {
    return this.blockService.getHelloWorld();
  }
}
