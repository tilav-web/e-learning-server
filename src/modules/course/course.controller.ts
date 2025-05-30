import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/auth.controller';

@Controller('courses')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByAuth(@Req() req: AuthenticatedRequest) {
    const { _id } = req.user;
    return this.service.findAllByAuth(_id); // auth id
  }

  @UseGuards(JwtAuthGuard)
  @Get('course/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
