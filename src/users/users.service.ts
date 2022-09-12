import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import * as bcrypt from "bcryptjs";
import { UpdateUserDto } from "./dto/updateUserDto";
import { Tag } from "../tags/tags.model";
import { userTags } from "./userTags.model";
import { arrayTagDto } from "./dto/arrayTagDto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Tag) private tagsModel: typeof Tag,
    @InjectModel(userTags) private userTagsModel: typeof userTags,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async getUser(user: User){
    const tags = await this.tagsModel.findAll({where: {creatorId: user.id}})
    return {
      email: user.email,
      nickname: user.nickname,
      tags: tags
    }
  }

  async updateCurrentUser(dto: UpdateUserDto, user: User){
    await this.userModel.update({
      email: dto.email || user.email,
      nickname: dto.nickname || user.nickname,
      password: dto.password ? await bcrypt.hash(dto.password, 5) : user.password
    }, {where :{ id: user.id }})

    return await this.userModel.findByPk(user.id)
  }

  async deleteUser(req){
    await this.userModel.destroy({where: {id: req.user.id}})
    return true
  }

  async addTagUser(dto: arrayTagDto, user: User){
    ///реализация, что у пользователя может быть много одних и тех же тегов(если запрещать такую реализацию, надо делать проверку в цикле)
    for (const item of dto.tags) {
      const check = await this.tagsModel.findByPk(item);
      if(!check) throw new HttpException(`Тега с id ${item} не найдено`, HttpStatus.BAD_REQUEST)
    }
    for (const item of dto.tags) await this.userTagsModel.create({ user_id: user.id, tag_id: item });
    return dto.tags
  }

  async deleteTagUser(id: number, user: User){
    const deleteResult = await this.userTagsModel.destroy({where: {id: id, user_id: user.id}})
    console.log(deleteResult)
    return deleteResult
  }

  async getUserTag(user: User){
    const tags: Tag[] = await this.tagsModel.findAll({where: {creatorId: user.id}})
    return {tags: tags}
  }
}
