import { Injectable } from '@nestjs/common';

import { BlockDto } from './dto/Block.dto';
import { DBConnectionService } from 'src/db_connection/db_connection.service';

@Injectable()
export class BlockService {
  constructor(private readonly dbConnectService: DBConnectionService) {}
  async createBlock(block: BlockDto) {
    const ret = await this.dbConnectService.createBlock(block);
    return ret ? true : false;
  }

  async readBlocks(projectId: string) {
    const ret = await this.dbConnectService.readBlocks(projectId);
    return ret;
  }
}
