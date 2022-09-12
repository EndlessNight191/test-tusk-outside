import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Tag } from "./tags.model";
import { User } from "../users/users.model";
import { AuthModule } from "../auth/auth.module";
import { UtilsModule } from "../utils/utils.module";

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
    SequelizeModule.forFeature([Tag, User]),
    AuthModule,
    UtilsModule
  ]
})
export class TagsModule {}
