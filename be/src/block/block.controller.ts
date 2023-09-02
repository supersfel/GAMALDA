import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDto } from './dto/Block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post('')
  async blockCreate(@Body() dto: BlockDto) {
    return await this.blockService.createBlock(dto);
  }

  @Get('/:projectId')
  async getProjectBlocks(@Param('projectId') projectId: string) {
    const ret = await this.blockService.readBlocks(projectId);
    return ret[0];
  }

  @Patch('')
  async blockUpdate(@Body() dto: BlockDto) {
    return await this.blockService.updateBlock(dto);
  }

  @Delete('/:blockId')
  async blockDelete(@Param('blockId') blockId: string) {
    return await this.blockService.deleteBlock(blockId);
  }

  //blockId로 블럭 한개의 정보만 받아올때
  @Post('/:blockId')
  async getBlock(@Param('blockId') blockId: string) {
    const ret = await this.blockService.readBlock(blockId);
    return ret[0][0];
  }
}
