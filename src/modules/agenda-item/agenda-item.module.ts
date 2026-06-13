import { Module } from '@nestjs/common';
import { AgendaItemController } from './agenda-item.controller';
import { AgendaItemService } from './agenda-item.service';
import { AgendaItemRepository } from './agenda-item.repository';

@Module({
  controllers: [AgendaItemController],
  providers: [AgendaItemService, AgendaItemRepository],
  exports: [AgendaItemService, AgendaItemRepository],
})
export class AgendaItemModule {}
