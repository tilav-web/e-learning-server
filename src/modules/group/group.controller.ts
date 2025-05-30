import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/auth.controller';

@UseGuards(JwtAuthGuard)
@Controller('/groups')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Get('/')
  async findAllByTeacher(@Req() req: AuthenticatedRequest) {
    const { _id } = req.user;
    return this.service.findAllByTeacher(_id);
  }
}
