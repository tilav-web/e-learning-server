// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('find/me')
  findMe(@Req() req: AuthenticatedRequest) {
    const { _id } = req.user;
    return this.authService.findMe(_id);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { auth, token } = await this.authService.login(dto);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 4 * 60 * 60 * 1000,
    });

    return auth;
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Tizimdan chiqdingiz!' };
  }
}
