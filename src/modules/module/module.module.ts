import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CModule, CModuleSchema } from './module.schema';
import { ModuleController } from './module.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CModule.name, schema: CModuleSchema }]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class CModuleModule {}
