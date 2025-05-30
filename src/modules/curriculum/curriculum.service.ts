import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Curriculum } from './curriculum.schema';
import { Model } from 'mongoose';
import { GroupService } from '../group/group.service';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectModel(Curriculum.name) private model: Model<Curriculum>,
    private readonly groupService: GroupService,
  ) {}

  async findById(id: string) {
    return this.model
      .findById(id)
      .populate('subjects')
      .populate('elective_subjects')
      .lean()
      .exec();
  }

  async findAllByGroup(id: string) {
    const group = await this.groupService.findById(id);
    const curriculums = group.curriculums;

    if (!curriculums || curriculums.length === 0) {
      return [];
    }

    return curriculums;
  }
}
