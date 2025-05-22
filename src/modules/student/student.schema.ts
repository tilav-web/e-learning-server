// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true, ref: 'Auth' })
  auth: Types.ObjectId;

  @Prop({ ref: 'Group', required: false, default: null })
  group: Types.ObjectId;

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

  @Prop({ required: true })
  passport_pin: number;

  @Prop({ required: true })
  passport_number: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
