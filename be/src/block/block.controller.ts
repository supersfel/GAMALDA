import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDto } from './dto/Block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post('/create')
  async blockCreate(@Body() dto: BlockDto) {
    return await this.blockService.createBlock(dto);
  }

  @Post('')
  async getProjectBlocks(@Body('projectId') projectId: string) {
    const ret = await this.blockService.readBlocks(projectId);
    return ret[0];
  }

  @Post('/update')
  async blockUpdate(@Body() dto: BlockDto) {
    return await this.blockService.updateBlock(dto);
  }
}
