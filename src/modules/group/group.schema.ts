// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Teacher' })
  teachers: Types.ObjectId[];

  @Prop({ ref: 'Course' })
  courses: Types.ObjectId[];

  @Prop({ ref: 'Student' })
  students: Types.ObjectId[];

  @Prop({ ref: 'Curriculum' })
  curriculums: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
