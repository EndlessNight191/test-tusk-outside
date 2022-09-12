import {
  Controller,
  Get,
  UseGuards,
  Request,
  Put,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  Post, Param
} from "@nestjs/common";
import { User } from "./users.model";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { UsersService } from "./users.service";
import {UpdateUserDto} from './dto/updateUserDto';
import { arrayTagDto } from "./dto/arrayTagDto";

@ApiTags('Пользователи и управление тегами пользователя')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'получение текущего пользователя'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Request() req){
    return this.usersService.getUser(req.user)
  }

  @ApiOperation({summary: 'обновление пользователя'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(AuthGuard)
  @Put()
  async updateUser(@Body() UpdateUserDto: UpdateUserDto, @Request() req){
    return this.usersService.updateCurrentUser(UpdateUserDto, req.user)
  }

  @ApiOperation({summary: 'удаление пользователя'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Request() req) {
    return this.usersService.deleteUser(req)
  }


  @ApiOperation({summary: 'Добавление тега к пользователю'})
  @ApiResponse({status: 200, type: [arrayTagDto]})
  @UseGuards(AuthGuard)
  @Post('/tag')
  async addTagUser(@Body() arrayTagDto: arrayTagDto, @Request() req){
    return this.usersService.addTagUser(arrayTagDto, req.user)
  }

  @ApiOperation({summary: 'Удаление тега'})
  @ApiResponse({status: 200, type: [arrayTagDto]})
  @UseGuards(AuthGuard)
  @Delete('tag/:id')
  async deleteTagUser(@Param('id') id, @Request() req){
    return this.usersService.deleteTagUser(id, req.user)
  }

  @ApiOperation({summary: 'Получение тега пользователя'})
  @ApiResponse({status: 200, type: [arrayTagDto]})
  @UseGuards(AuthGuard)
  @Get('tag/my')
  async getUserTag(@Request() req){
    return this.usersService.getUserTag(req.user)
  }

}
