import { Body, Controller, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { User } from "../users/users.model";
import { RegistrationDto } from './dto/registrationDto';
import { AuthDto } from "./dto/authDto";

interface token {
  token: string,
  expirein: number
}

interface tokensReturn {
  access_token: token
  refresh_token: token,
}


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: "Регистрация"})
  @ApiResponse({status: 200, type: User})
  @Post('/registration')
  async registration(@Body() RegistrationDto: RegistrationDto){
    return this.authService.registrations(RegistrationDto)
  }

  @ApiOperation({summary: "Авторизация"})
  @ApiResponse({status: 200, type: User})
  @Post('/login')
  async login(@Body() authDto: AuthDto){
    return this.authService.authorization(authDto)
  }

  @ApiOperation({summary: "Обновление токенов"})
  @ApiResponse({status: 200, type: User})
  @Put('/refresh')
  async refreshToken(){
    return this.authService.refreshToken()
  }

  @ApiOperation({summary: "Разлогин пользователя"})
  @ApiResponse({status: 200, type: User})
  @Put('/logout')
  async logOut(){
    return this.authService.outLogin()
  }

}
