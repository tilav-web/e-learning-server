// src/auth/schemas/auth.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthRoleEnum } from 'src/common/enums/auth-role.enum';

@Schema({ timestamps: true })
export class Auth extends Document {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: AuthRoleEnum, default: AuthRoleEnum.STUDENT })
  role: AuthRoleEnum;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
