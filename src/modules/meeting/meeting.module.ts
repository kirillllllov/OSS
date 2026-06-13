import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './meeting.repository';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService, MeetingRepository],
  exports: [MeetingService, MeetingRepository],
})
export class MeetingModule {}
