import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import {Utils} from './utils.service.js'
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";


@Module({
  controllers: [],
  providers: [Utils],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({})
  ],
  exports: [
    Utils
  ]
})
export class UtilsModule {}