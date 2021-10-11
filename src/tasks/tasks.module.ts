import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './trask.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [],
})
export class TasksModule {}
