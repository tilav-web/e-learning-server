import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/auth.controller';

@UseGuards(JwtAuthGuard)
@Controller('lesson-schedule')
export class LessonScheduleController {
  constructor(private readonly service: LessonScheduleService) {}

  @Get('schedule/:id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get('schedule/day/:day')
  async findByDay(@Param('day') day: string) {
    return this.service.findByDay(day);
  }

  @Get('schedule/day/:week')
  async findByWeek(@Param('week') week: string) {
    return this.service.findByWeek(week);
  }

  @Get('schedule/subject/:subject')
  async findBySubject(@Param('subject') subject: string) {
    return this.service.findBySubject(subject);
  }

  @Get('schedule/group/day/:day')
  async findByGroupAndDay(
    @Param('day') day: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const { _id } = req.user;
    return this.service.findByAuthAndDay({ id: _id, day });
  }

  @Get('schedule/group/week/:week')
  async findByGroupAndWeek(
    @Param('week') week: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const { _id } = req.user;
    return this.service.findByAuthAndWeek({ id: _id, week });
  }
}
