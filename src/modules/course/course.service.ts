import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.schema';
import { Model } from 'mongoose';
import { TeacherService } from '../teacher/teacher.service';
import { AuthService } from '../auth/auth.service';
import { GroupService } from '../group/group.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private model: Model<Course>,
    private readonly teacherService: TeacherService,
    private readonly authService: AuthService,
    private readonly groupService: GroupService,
  ) {}

  async findAllByAuth(id: string) {
    const auth = await this.authService.findById(id); //auth id
    if (!auth)
      throw new BadRequestException(
        'Malumotdan foydalanish huquqiga ega emassiz',
      );

    let courses = {};

    if (auth.role === 'teacher') {
      courses = await this.model
        .find({ teacher: auth.teacher?._id })
        .populate('subject')
        .lean()
        .exec();
    }

    if (auth.role === 'student') {
      const group = await this.groupService.findById(
        auth.student?.group.toString(),
      );
      courses = group.courses;
    }

    return courses;
  }

  async findById(id: string) {
    const course = await this.model
      .findById(id)
      .populate('groups')
      .populate('teacher')
      .populate('subject')
      .populate({
        path: 'modules',
        populate: 'lessons',
      })
      .lean()
      .exec();
    return course;
  }
}
