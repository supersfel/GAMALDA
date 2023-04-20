import { Controller, Get, Req } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  getHelloWorld(@Req() req): string {
    console.log(req.body);
    return this.blockService.getHelloWorld();
  }
}
