import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CModule } from './module.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ModuleService {
  constructor(@InjectModel(CModule.name) private model: Model<CModule>) {}

  async findAllByCourse(course: string) {
    return this.model
      .find({ course: new Types.ObjectId(course) })
      .populate('lessons')
      .lean()
      .exec();
  }
}
