// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Teacher extends Document {
  @Prop({ required: true, ref: 'Auth' })
  auth: Types.ObjectId;

  @Prop({ required: false, ref: 'Group', default: null })
  groups: Types.ObjectId[];

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  second_name: string;

  @Prop({ required: true })
  third_name: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  short_name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  birth_date: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
