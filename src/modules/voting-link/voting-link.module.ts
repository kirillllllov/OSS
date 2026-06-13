import { Module } from '@nestjs/common';
import { VotingLinkController } from './voting-link.controller';
import { VotingLinkService } from './voting-link.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VotingLinkController],
  providers: [VotingLinkService],
  exports: [VotingLinkService],
})
export class VotingLinkModule {}
