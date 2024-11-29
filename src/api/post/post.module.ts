import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from '../../db/entity/posts.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]),AuthModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
