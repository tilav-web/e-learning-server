import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/lessons')
export class LessonController {
  constructor(private readonly service: LessonService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/lesson/:id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
