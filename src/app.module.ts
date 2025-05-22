import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/e-learning'),
    AuthModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
