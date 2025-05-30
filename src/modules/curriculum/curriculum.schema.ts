import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Curriculum extends Document {
  @Prop({ ref: 'Groups' })
  groups: Types.ObjectId[];

  @Prop({ required: true, ref: 'Subject' })
  subjects: Types.ObjectId[];

  @Prop({ ref: 'Subject' })
  elective_subjects: Types.ObjectId[];

  @Prop({ required: true })
  semester: number;
}

export const CurriculumSchema = SchemaFactory.createForClass(Curriculum);
