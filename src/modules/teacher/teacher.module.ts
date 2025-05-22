// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './teacher.schema';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
  ],
  controllers: [],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
