import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/users.model";

interface payload{
  id: number,
  email: string,
}

interface keys {
  accessToken: string,
  refreshToken: string
}

@Injectable()
export class Utils {
  private static jwtService: JwtService;
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  generateJwtToken(payload: payload): keys{
    return {
        accessToken: this.jwtService.sign(payload, {expiresIn: 1800, secret: 'access'}),
        refreshToken: this.jwtService.sign(payload, {expiresIn: 86400, secret: 'refresh'})
    }
  }

  verifyTokenAccess(token: string){
    return this.jwtService.verify(token, {secret: 'access'})
  }

  verifyTokenRefresh(token: string){
    return this.jwtService.verify(token, {secret: 'refresh'})
  }

  async getUserByIdForTag(id: number){
    const user: User = await this.userModel.findByPk(id)
    if(!user) throw new HttpException(`Пользователя не найдено при выборке тега`, HttpStatus.BAD_REQUEST)
    return  { nickname: user.nickname, uid: user.id }
  }
}