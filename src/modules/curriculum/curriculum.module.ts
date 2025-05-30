import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Curriculum, CurriculumSchema } from './curriculum.schema';
import { GroupModule } from '../group/group.module';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Curriculum.name, schema: CurriculumSchema },
    ]),
    GroupModule,
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
