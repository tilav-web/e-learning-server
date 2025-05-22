import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private model: Model<Student>) {}

  async findByAuth(auth: string) {
    const student = await this.model.findOne({ auth }).lean();

    if (!student)
      throw new BadRequestException(
        "Bu autentifikatsiyaga talaba biriktirilmagan. Admin bilan bog'laning!",
      );

    return student;
  }
}
