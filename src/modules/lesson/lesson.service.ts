import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './lesson.schema';
import { Model } from 'mongoose';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson.name) private model: Model<Lesson>) {}

  async findById(id: string) {
    const lesson = await this.model
      .findById(id)
      .populate('resources')
      .lean()
      .exec();
    return lesson;
  }
}
