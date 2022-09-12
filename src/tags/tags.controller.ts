import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { addTagDto } from "./dto/addTagDto";
import { User } from "../users/users.model";
import { AuthGuard } from "../auth/auth.guard";
import { updateTagDto } from "./dto/updateTagDto";

@ApiTags('Пользователи')
@Controller('tag')
export class TagsController {
  constructor(private tagsService: TagsService) {
  }

  @ApiOperation({summary: "создание тега"})
  @ApiResponse({status: 200, type: addTagDto})
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() addTagDto: addTagDto, @Request() req){
    return this.tagsService.addTag(addTagDto, req.user)
  }

  @ApiOperation({summary: "получение тега по id"})
  @ApiResponse({status: 200, type: addTagDto})
  @UseGuards(AuthGuard)
  @Get('/:id')
  getTag(@Param('id') id){
    return this.tagsService.getTagById(id)
  }

  @ApiOperation({summary: "получение тега по id"})
  @ApiResponse({status: 200, type: addTagDto})
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateTag(@Body() updateTagDto: updateTagDto, @Request() req ,@Param('id') id){
    return this.tagsService.updateTagById(updateTagDto, req.user, id)
  }

  @ApiOperation({summary: "получение тега по id"})
  @ApiResponse({status: 200, type: addTagDto})
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteTag(@Param('id') id, @Request() req){
    return this.tagsService.deleteTagById(id, req.user)
  }

  @ApiOperation({summary: "получение тегов"})
  @ApiResponse({status: 200, type: addTagDto})
  @UseGuards(AuthGuard)
  @Get()
  getTags(@Query() query){
    return this.tagsService.getTags(query)
  }



}
