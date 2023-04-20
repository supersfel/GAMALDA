import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDto } from './dto/Block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post('/create')
  async blockCreate(@Body() dto: BlockDto) {
    console.log('in create');
    return await this.blockService.createBlock(dto);
  }
}
