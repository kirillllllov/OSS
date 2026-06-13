import { Module } from '@nestjs/common';
import { QuorumController } from './quorum.controller';
import { QuorumService } from './quorum.service';

@Module({
  controllers: [QuorumController],
  providers: [QuorumService],
  exports: [QuorumService],
})
export class QuorumModule {}
