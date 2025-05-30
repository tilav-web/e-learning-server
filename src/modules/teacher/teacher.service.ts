import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './teacher.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TeacherService {
  constructor(@InjectModel(Teacher.name) private model: Model<Teacher>) {}

  async findByAuth(auth: string) {
    const teacher = await this.model
      .findOne({ auth: new Types.ObjectId(auth) })
      .populate('groups')
      .lean();

    if (!teacher)
      throw new BadRequestException(
        "Bu autentifikatsiyaga o'qituvchi biriktirilmagan. Admin bilan bog'laning!",
      );

    return teacher;
  }

  async searchTeachers(
    query: string = '',
    page = 1,
    limit = 10,
  ): Promise<{
    data: Teacher[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const regex = new RegExp(query, 'i'); // Case-insensitive
    const filter = query
      ? {
          $or: [
            { first_name: regex },
            { second_name: regex },
            { third_name: regex },
            { full_name: regex },
            { short_name: regex },
            { email: regex },
            { phone: regex },
          ],
        }
      : {};

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const teacher = await this.model.findById(id).populate('groups');
    return teacher;
  }

  async findByIdAndUpdate({ id, dto }: { id: string; dto: Partial<Teacher> }) {
    const updated = await this.model.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      throw new NotFoundException('O‘qituvchi topilmadi');
    }

    return updated;
  }

  async findByIdAndDelete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
