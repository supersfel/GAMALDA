import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { DBConnectionService } from 'src/db_connection/db_connection.service';

@Module({
  controllers: [BlockController],
  providers: [BlockService, DBConnectionService],
})
export class BlockModule {}
