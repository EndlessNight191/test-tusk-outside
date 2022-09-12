import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { User } from "./users/users.model";
import { Tag } from "./tags/tags.model";
import { userTags } from "./users/userTags.model";
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      // @ts-ignore
      dialect: 'postgres',
      host: `${process.env.TYPEORM_HOST}`,
      // @ts-ignore
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      models: [User, Tag, userTags],
      autoLoadModels: true
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
