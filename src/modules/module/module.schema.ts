// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CModule extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true, ref: 'Course' })
  course: Types.ObjectId;

  @Prop({ ref: 'Lesson' })
  lessons: Types.ObjectId[];
}

export const CModuleSchema = SchemaFactory.createForClass(CModule);
