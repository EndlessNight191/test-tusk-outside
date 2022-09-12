import { HttpException, HttpStatus, Inject, Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { RegistrationDto } from "./dto/registrationDto";
import { AuthDto } from "./dto/authDto";
import { Utils } from '../utils/utils.service.js'
import * as bcrypt from 'bcryptjs'
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private Utils: Utils,
    @Inject(REQUEST) private readonly request: Request
  ) {
  }

  async registrations(dto: RegistrationDto){
    let userCheck: User = await this.userModel.findOne({where: {email: dto.email}})
    if(userCheck) throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    userCheck = await this.userModel.findOne({where: {nickname: dto.nickname}})
    if(userCheck) throw new HttpException('Пользователь с таким nickname уже существует', HttpStatus.BAD_REQUEST)

    const password: string = await bcrypt.hash(dto.password, 5)
    const user = await this.userModel.create({...dto, password: password})
    const {accessToken, refreshToken} = this.Utils.generateJwtToken({email: user.email, id: user.id})
    await this.userModel.update({access_token: accessToken, refresh_token: refreshToken}, {where: {id: user.id}})

    return {
      access_token: {
        token: accessToken,
        expire: 1800
      },
      refresh_token: {
        token: refreshToken,
        expire: 1800
      }
    }

  }

  async authorization(dto: AuthDto){
    const user: User = await this.userModel.findOne({where: {email: dto.email}})
    if(!user) throw new HttpException('Пользователь с таким email не существует', HttpStatus.BAD_REQUEST)
    const checkPass: boolean = await bcrypt.compare(dto.password, user.password)
    if(!checkPass) throw new HttpException('Не верный пароль', HttpStatus.BAD_REQUEST)

    const {accessToken, refreshToken} = this.Utils.generateJwtToken({email: user.email, id: user.id})
    await this.userModel.update({access_token: accessToken, refresh_token: refreshToken}, {where: {id: user.id}})

    return {
      access_token: {
        token: accessToken,
        expire: 1800
      },
      refresh_token: {
        token: refreshToken,
        expire: 1800
      }
    }
  }

  async refreshToken(){
    try{
      const authHeader: string = this.request.headers.authorization
      const bearer: string = authHeader.split(' ')[0]
      const token: string = authHeader.split(' ')[1]
      if(bearer !== 'Bearer' || !token) throw new UnauthorizedException({message: 'Вы не правильно вводите токен'})

      const verifyToken = this.Utils.verifyTokenRefresh(token)
      console.log(verifyToken)
      const user = await this.userModel.findOne({where: {id: verifyToken.id, refresh_token: token}})
      if(!user) throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)

      const {accessToken, refreshToken} = this.Utils.generateJwtToken({email: user.email, id: user.id})
      await this.userModel.update({access_token: accessToken, refresh_token: refreshToken}, {where: {id: user.id}})

      return {
        access_token: {
          token: accessToken,
          expire: 1800
        },
        refresh_token: {
          token: refreshToken,
          expire: 1800
        }
      }
    }catch (e){
      throw new UnauthorizedException({message: 'Ошибка авторизации'})
    }
  }

  async outLogin(){
    try {
      const authHeader: string = this.request.headers.authorization
      const bearer: string = authHeader.split(' ')[0]
      const token: string = authHeader.split(' ')[1]
      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException({ message: 'Вы не правильно вводите токен' })

      const verifyToken = this.Utils.verifyTokenRefresh(token)
      console.log(verifyToken)
      const user = await this.userModel.findOne({ where: { id: verifyToken.id, refresh_token: token } })
      if (!user) throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
      await this.userModel.update({ access_token: null, refresh_token: null }, { where: { id: user.id } })

      return true
    }
    catch (e){
      throw new UnauthorizedException({message: 'Вы не авторизованы'})
    }
  }

}
