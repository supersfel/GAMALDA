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

  @Post('/delete')
  async blockDelete(@Body('blockId') blockId: string) {
    return await this.blockService.deleteBlock(blockId);
  }

  //blockId로 블럭 한개의 정보만 받아올때
  @Post('/readBlock')
  async getBlock(@Body('blockId') blockId: string) {
    const ret = await this.blockService.readBlock(blockId);
    return ret[0][0];
  }
}
