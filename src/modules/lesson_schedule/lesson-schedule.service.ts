import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LessonSchedule } from './lesson-schedule.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LessonScheduleService {
  constructor(
    @InjectModel(LessonSchedule.name) readonly model: Model<LessonSchedule>,
    private readonly authService: AuthService,
  ) {}

  async findById(id: string) {
    const lessonSchedule = await this.model
      .findById(id)
      .populate('subject')
      .populate('teacher')
      .populate('group')
      .exec();
    return lessonSchedule;
  }

  async findBySubject(subject: string) {
    const lessonSchedules = await this.model
      .find({ subject })
      .populate('subject')
      .populate('teacher')
      .populate('group')
      .exec();
    return lessonSchedules;
  }

  async findByAuthAndDay({ id, day }: { id: string; day: string }) {
    // Frontend'dan kelgan sana, masalan: '2025-05-27'
    const date = new Date(day);

    // Kunning boshlanishi va tugashini aniqlaymiz
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const auth = await this.authService.findById(id);

    if ('student' in auth) {
      const lessonSchedules = await this.model
        .find({
          group: auth.student.group,
          start_date: { $gte: startOfDay, $lte: endOfDay },
        })
        .populate('subject')
        .populate('teacher')
        .populate('group')
        .exec();
      return lessonSchedules;
    }

    if ('teacher' in auth) {
      const lessonSchedules = await this.model
        .find({
          teacher: auth.teacher._id,
          start_date: { $gte: startOfDay, $lte: endOfDay },
        })
        .populate('subject')
        .populate('teacher')
        .populate('group')
        .exec();
      return lessonSchedules;
    }
  }

  async findByAuthAndWeek({ id, week }: { id: string; week: string }) {
    const inputDate = new Date(week);

    // Haftaning birinchi kunini (Dushanba) olish
    const dayOfWeek = inputDate.getDay(); // Yakshanba = 0, Dushanba = 1, ...
    const diffToMonday = (dayOfWeek + 6) % 7; // Yakshanba uchun 6, Dushanba uchun 0

    const monday = new Date(inputDate);
    monday.setDate(inputDate.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0); // Dushanba 00:00

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999); // Yakshanba 23:59:59

    const auth = await this.authService.findById(id);

    if ('student' in auth) {
      const lessonSchedules = await this.model
        .find({
          group: auth.student.group,
          start_date: { $gte: monday, $lte: sunday },
        })
        .populate('subject')
        .populate('teacher')
        .populate('group')
        .exec();
      return lessonSchedules;
    }

    if ('teacher' in auth) {
      const lessonSchedules = await this.model
        .find({
          teacher: auth.teacher._id,
          start_date: { $gte: monday, $lte: sunday },
        })
        .populate('subject')
        .populate('teacher')
        .populate('group')
        .exec();
      return lessonSchedules;
    }
  }

  async findByDay(day: string) {
    // Frontend'dan kelgan sana, masalan: '2025-05-27'
    const date = new Date(day);

    // Kunning boshlanishi va tugashini aniqlaymiz
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const lessonSchedules = await this.model
      .find({
        start_date: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate('subject')
      .populate('teacher')
      .populate('group')
      .exec();

    return lessonSchedules;
  }

  async findByWeek(dayStr: string) {
    const inputDate = new Date(dayStr);

    // Haftaning birinchi kunini (Dushanba) olish
    const dayOfWeek = inputDate.getDay(); // Yakshanba = 0, Dushanba = 1, ...
    const diffToMonday = (dayOfWeek + 6) % 7; // Yakshanba uchun 6, Dushanba uchun 0

    const monday = new Date(inputDate);
    monday.setDate(inputDate.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0); // Dushanba 00:00

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999); // Yakshanba 23:59:59

    const lessonSchedules = await this.model
      .find({
        start_date: { $gte: monday, $lte: sunday },
      })
      .populate('subject')
      .populate('teacher')
      .populate('group')
      .exec();

    return lessonSchedules;
  }
}
