import { Injectable } from '@nestjs/common';

import { BlockDto } from './dto/Block.dto';
import { DBConnectionService } from 'src/db_connection/db_connection.service';

@Injectable()
export class BlockService {
  constructor(private readonly dbConnectService: DBConnectionService) {}
  async createBlock(block: BlockDto) {
    const ret = await this.dbConnectService.createBlock(block);

    // 블럭이 정상 실행되면 생성된 id를 반환
    return ret ? ret[0]['insertId'] : false;
  }

  async readBlocks(projectId: string) {
    return await this.dbConnectService.readBlocks(projectId);
  }

  async updateBlock(block: BlockDto) {
    // console.log(`update가 되었습니다~`);
    const ret = await this.dbConnectService.updateBlock(block);
    return ret ? true : false;
  }

  async deleteBlock(blockId: string) {
    const ret = await this.dbConnectService.deleteBlock(blockId);
    return ret ? true : false;
  }

  async readBlock(blockId: string) {
    // console.log(`${blockId} 를 읽었습니다~`);
    return await this.dbConnectService.readBlock(blockId);
  }
}
