import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegretModule } from './regret.module';
import { Regret } from './regret.entity';

/**
 * Root application module.
 * This module configures the main application including database connection,
 * CORS settings, and imports all feature modules.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'wall-of-regret.db',
      entities: [Regret],
      synchronize: true, // Note: In production, use migrations instead
    }),
    RegretModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
