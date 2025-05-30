import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from './resource.schema';
import { Model } from 'mongoose';

@Injectable()
export class ResourceService {
  constructor(@InjectModel(Resource.name) private model: Model<Resource>) {}

  async findById(id: string) {
    return this.model.findById(id);
  }
}
