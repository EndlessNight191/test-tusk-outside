import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UtilsModule } from "../utils/utils.module";
import { AuthGuard } from "./auth.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([User]),
    UtilsModule,
    /*AuthGuard*/
  ],
  exports: [
    JwtModule,
    UtilsModule,
    AuthModule
  ]
})
export class AuthModule {}
