// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Teacher' })
  teacher: Types.ObjectId;

  @Prop({ ref: 'Group' })
  groups: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
