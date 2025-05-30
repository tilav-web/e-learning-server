import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ModuleService } from './module.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/modules')
export class ModuleController {
  constructor(private readonly service: ModuleService) {}

  // Teacher uchun middleware ni sozlash kerak
  @UseGuards(JwtAuthGuard)
  @Get('/courses/:id')
  findAllByCourse(@Param('id') id: string) {
    return this.service.findAllByCourse(id);
  }
}
