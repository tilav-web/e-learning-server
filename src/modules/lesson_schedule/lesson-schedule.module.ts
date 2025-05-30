import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonSchedule, LessonScheduleSchema } from './lesson-schedule.schema';
import { LessonScheduleController } from './lesson-schedule.controller';
import { LessonScheduleService } from './lesson-schedule.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LessonSchedule.name,
        schema: LessonScheduleSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [LessonScheduleController],
  providers: [LessonScheduleService],
})
export class LessonScheduleModule {}
