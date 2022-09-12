import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tag } from "./tags.model";
import { User } from "../users/users.model";
import { addTagDto } from "./dto/addTagDto";
import { updateTagDto } from "./dto/updateTagDto";
import { Utils } from "../utils/utils.service.js";

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag) private TagModel: typeof Tag,
    @InjectModel(User) private UserModel: typeof User,
    private Utils: Utils,
  ) {}

  async addTag(dto: addTagDto, user: User){
    const tags = await this.TagModel.findOne({where: {name: dto.name}})
    if(tags) throw new HttpException(`таг с таким именем уже существует`, HttpStatus.BAD_REQUEST)
    const tag = await this.TagModel.create({ creatorId: user.id, name: dto.name, sortOrder: dto.sortOrder || 0 })
    const tagsResultGet: Tag[] = await this.TagModel.findAll({where: {creatorId: user.id}})
    return { tags: tagsResultGet }
  }

  async getTagById(id: number){
    const tag: Tag = await this.TagModel.findByPk(id)
    tag.creator = await this.Utils.getUserByIdForTag(tag.creatorId)
    return tag
  }


  async updateTagById(dto: updateTagDto, user: User, id: number){
    const tag: Tag = await this.TagModel.findOne({where: {id: id, creatorId: user.id}})
    if(!tag) throw new HttpException(`Тега с id ${id} не найдено или вы не имеете к нему доступу`, HttpStatus.BAD_REQUEST)
    const result = await this.TagModel.update({name: dto.name || tag.name, sortOrder: dto.sortOrder || tag.sortOrder}, {
      where: {id: id, creatorId: user.id}})
    if(!result) throw new HttpException(`Что-то пошло не так`, HttpStatus.BAD_REQUEST)
    let tagUpdate: Tag = await this.TagModel.findByPk(id)
    tagUpdate.creator = await this.Utils.getUserByIdForTag(tag.creatorId)
    return tagUpdate
  }


  async deleteTagById(id: number, user: User){
    const result = await this.TagModel.destroy({where: {id: id, creatorId: user.id}})
    if(!result) return false
    return true
  }

  async getTags(query){
    const order = []
    if(query.sortByOrder) order.push(['sortOrder', 'DESC'])
    if(query.sortByName) order.push(['name', 'DESC'])
    const tags = await this.TagModel.findAll({where: {}, order, limit: query.length || 9, offset: query.offset || 0}) ///переписать со сложным запросом

    ///если без сложного запроса, то добавляем в ручную пользователя↓↓↓
    for(let item of tags){ item.creator = await this.Utils.getUserByIdForTag(item.creatorId) }
    return {
      data: tags,
      meta: {
        offset: query.offset || 0,
        length: query.length || 9,
        quantity: tags.length
      }
    }

  }

}
