// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Teacher' })
  teachers: Types.ObjectId[];

  @Prop({ ref: 'Courses' })
  courses: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
