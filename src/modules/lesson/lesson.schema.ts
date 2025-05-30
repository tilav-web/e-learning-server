// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LessonTypeEnum } from 'src/common/enums/lesson-type.enum';

@Schema({ timestamps: true })
export class Lesson extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true, ref: 'Module' })
  module: Types.ObjectId;

  @Prop({ required: true, enum: LessonTypeEnum })
  type: LessonTypeEnum;

  @Prop({ required: true })
  target: string;

  @Prop({ ref: 'Resource' })
  resources: Types.ObjectId[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
