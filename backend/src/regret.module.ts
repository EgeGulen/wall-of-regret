import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegretController } from './regret.controller';
import { RegretService } from './regret.service';
import { Regret } from './regret.entity';

/**
 * Module for regret-related functionality.
 * This module encapsulates all regret-related components including
 * the controller, service, and entity. It also configures the
 * TypeORM repository for the Regret entity.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Regret])],
  controllers: [RegretController],
  providers: [RegretService],
  exports: [RegretService],
})
export class RegretModule {}
