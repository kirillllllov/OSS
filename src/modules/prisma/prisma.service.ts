import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

const ExtendablePrismaClient = PrismaClient as unknown as new () => PrismaClient;

@Injectable()
export class PrismaService extends ExtendablePrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to database successfully');
    } catch (error) {
      this.logger.warn(`Database connection failed: ${error.message}`);
      this.logger.warn('API server is running, but database operations will fail until a connection is established.');
    }
  }
}
