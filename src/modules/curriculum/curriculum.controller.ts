import { Controller, Get, Param } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';

@Controller('/curriculums')
export class CurriculumController {
  constructor(private readonly service: CurriculumService) {}

  @Get('curriculum/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get('group/:id')
  findAllByGroup(@Param('id') id: string) {
    return this.service.findAllByGroup(id);
  }
}
