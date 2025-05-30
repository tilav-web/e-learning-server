// src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Auth } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthRoleEnum } from 'src/common/enums/auth-role.enum';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher } from '../teacher/teacher.schema';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.schema';

export interface IAuthResponse {
  auth: Auth & { teacher?: Teacher; student?: Student };
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
    private teacherService: TeacherService,
    private studentService: StudentService,
  ) {}

  async register(dto: RegisterDto): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.authModel({
      uid: dto.uid,
      password: hashedPassword,
      role: dto.role,
    });
    return user.save();
  }

  async login(dto: LoginDto): Promise<IAuthResponse> {
    const auth = await this.authModel.findOne({ uid: dto.uid }).lean();
    if (!auth) {
      throw new UnauthorizedException('ID-da xatolik bor!');
    }

    const passwordCheck = await bcrypt.compare(dto.password, auth.password);

    if (!passwordCheck) {
      throw new UnauthorizedException('Password-da xatolik bor!');
    }

    let resAuth;

    if (auth.role === AuthRoleEnum.TEACHER) {
      const teacher = await this.teacherService.findByAuth(auth._id as string);
      if (teacher) {
        resAuth = {
          ...auth,
          teacher,
        };
      }
    }

    if (auth.role === AuthRoleEnum.STUDENT) {
      const student = await this.studentService.findByAuth(auth._id as string);
      if (student) {
        resAuth = {
          ...auth,
          student,
        };
      }
    }

    const token = this.jwtService.sign({ _id: auth._id });

    return { auth: resAuth, token };
  }

  async findMe(
    id: string,
  ): Promise<Auth & { teacher?: Teacher; student: Student }> {
    const auth = await this.authModel.findById(id).lean().exec();

    if (!auth)
      throw new BadRequestException(
        'Xavfsizlik uchun tizimga qayta kirishingiz kerak!',
      );

    let resAuth;

    if (auth.role === AuthRoleEnum.TEACHER) {
      const teacher = await this.teacherService.findByAuth(auth._id as string);
      if (teacher) {
        resAuth = {
          ...auth,
          teacher,
        };
      }
    }

    if (auth.role === AuthRoleEnum.STUDENT) {
      const student = await this.studentService.findByAuth(auth._id as string);
      if (student) {
        resAuth = {
          ...auth,
          student,
        };
      }
    }

    return resAuth;
  }

  async findById(
    id: string,
  ): Promise<Auth & { teacher?: Teacher; student?: Student }> {
    const auth = await this.authModel.findById(id).lean().exec();

    if (!auth) {
      throw new BadRequestException('Foydalanuvchi topilmadi!');
    }

    let resAuth;

    if (auth.role === AuthRoleEnum.TEACHER) {
      const teacher = await this.teacherService.findByAuth(auth._id as string);
      if (teacher) {
        resAuth = {
          ...auth,
          teacher,
        };
      }
    }

    if (auth.role === AuthRoleEnum.STUDENT) {
      const student = await this.studentService.findByAuth(auth._id as string);
      if (student) {
        resAuth = {
          ...auth,
          student,
        };
      }
    }

    return resAuth;
  }
}
