// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CourseTypeEnum } from 'src/common/enums/course-type-enum';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true, ref: 'Subject' })
  subject: Types.ObjectId;

  @Prop({ ref: 'Teacher', required: true })
  teacher: Types.ObjectId;

  @Prop({ ref: 'Group' })
  groups: Types.ObjectId[];

  @Prop({ ref: 'CModule' })
  modules: Types.ObjectId[];

  @Prop({
    required: true,
    enum: CourseTypeEnum,
    default: CourseTypeEnum.LECTURE,
  })
  type: CourseTypeEnum;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
