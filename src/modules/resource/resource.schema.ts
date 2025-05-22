// src/Student/schemas/Student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Resource extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Lesson' })
  lesson: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  target: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
