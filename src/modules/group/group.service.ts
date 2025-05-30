import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './group.schema';
import { Model } from 'mongoose';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private model: Model<Group>,
    private readonly teacherService: TeacherService,
  ) {}
  async findById(id: string) {
    const group = await this.model
      .findById(id)
      .populate({
        path: 'courses',
        populate: {
          path: 'subject',
        },
      })
      .populate({
        path: 'curriculums',
        populate: [{ path: 'subjects' }, { path: 'elective_subjects' }],
      })
      .lean()
      .exec();

    if (!group) {
      throw new Error('Group not found');
    }
    return group;
  }

  async findAllByTeacher(id: string) {
    const teacher = await this.teacherService.findByAuth(id);
    const groups = teacher.groups;
    return groups;
  }
}
