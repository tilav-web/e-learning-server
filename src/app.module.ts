import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { CourseModule } from './modules/course/course.module';
import { GroupModule } from './modules/group/group.module';
import { CModuleModule } from './modules/module/module.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { ResourceModule } from './modules/resource/resource.module';
import { SubjectModule } from './modules/subject/subject.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { LessonScheduleModule } from './modules/lesson_schedule/lesson-schedule.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/e-learning'),
    AuthModule,
    StudentModule,
    TeacherModule,
    CourseModule,
    GroupModule,
    CModuleModule,
    LessonModule,
    ResourceModule,
    SubjectModule,
    CurriculumModule,
    LessonScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
