import { Module } from '@nestjs/common';
import { BallotController } from './ballot.controller';
import { BallotService } from './ballot.service';
import { BallotRepository } from './ballot.repository';

@Module({
  controllers: [BallotController],
  providers: [BallotService, BallotRepository],
  exports: [BallotService, BallotRepository],
})
export class BallotModule {}
