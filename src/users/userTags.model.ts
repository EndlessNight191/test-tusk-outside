import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TagCreate {
  user_id: number,
  tag_id: number
}

@Table({tableName: 'userTags'})
export class userTags extends Model<userTags, TagCreate>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.INTEGER, primaryKey: true, references: {model: 'users', key: 'id'}, onDelete: 'cascade'})
  user_id: number

  @Column({type: DataType.INTEGER, primaryKey: true, references: {model: 'tags', key: 'id'}, onDelete: 'cascade'})
  tag_id: string
}