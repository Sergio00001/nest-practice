import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DatabasePostgresModule } from './database-postgres/database.postgres.module';

@Module({
  imports: [TaskModule, DatabasePostgresModule],
  providers: [],
})
export class AppModule {}
