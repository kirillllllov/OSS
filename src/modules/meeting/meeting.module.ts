import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './meeting.repository';
import { BallotScannerService } from './ballot-scanner.service';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService, MeetingRepository, BallotScannerService],
  exports: [MeetingService, MeetingRepository, BallotScannerService],
})
export class MeetingModule {}
