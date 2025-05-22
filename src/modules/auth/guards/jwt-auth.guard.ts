import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('Token topilmadi');
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      request['user'] = payload;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati o'tgan");
    }
  }
}
