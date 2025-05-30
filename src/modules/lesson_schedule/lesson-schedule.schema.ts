import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Subject } from '../subject/subject.schema';
import { Group } from '../group/group.schema';
import { Teacher } from '../teacher/teacher.schema';

@Schema({ timestamps: true })
export class LessonSchedule extends Document {
  @Prop({ required: true, ref: Subject.name, type: Types.ObjectId })
  subject: Types.ObjectId;

  @Prop({ required: true, ref: Group.name, type: Types.ObjectId })
  group: Types.ObjectId;

  @Prop({ required: true, ref: Teacher.name, type: Types.ObjectId })
  teacher: Types.ObjectId;

  @Prop({ required: true })
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;

  @Prop({ required: true })
  target: string;
}

export const LessonScheduleSchema =
  SchemaFactory.createForClass(LessonSchedule);
