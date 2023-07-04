/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  user_id: number;

  @Prop()
  total_like: number;

  @Prop({ required: true })
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
