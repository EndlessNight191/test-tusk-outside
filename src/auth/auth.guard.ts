import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { Utils } from '../utils/utils.service.js';
import { User } from "../users/users.model";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: typeof User,
    private Utils: Utils,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    try{
      const authHeader: string = req.headers.authorization
      const bearer: string = authHeader.split(' ')[0]
      const token: string = authHeader.split(' ')[1]
      if(bearer !== 'Bearer' || !token) throw new UnauthorizedException({message: 'Вы не правильно вводите токен'})

      const verifyToken = this.Utils.verifyTokenAccess(token)
      const user: User = await this.userModel.findOne({where: {id: verifyToken.id, access_token: token}})
      if(!user) throw new UnauthorizedException({message: 'Пользователя не найдено'})
      req.user = user
      return true
    }catch (e){
      throw new UnauthorizedException({message: 'Ошибка авторизации'})
    }
  }
}