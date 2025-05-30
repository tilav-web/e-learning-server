import { Module } from '@nestjs/common';
import { TeacherModule } from '../teacher/teacher.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './course.schema';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthModule } from '../auth/auth.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    TeacherModule,
    AuthModule,
    GroupModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
