import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TagCreate {
  creatorId: number,
  name: string,
  sortOrder: number
}

@Table({tableName: 'tags'})
export class Tag extends Model<Tag, TagCreate>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.INTEGER, primaryKey: true, references: {model: 'users', key: 'id'}, onDelete: 'cascade'})
  creatorId: number

  @Column({type: DataType.STRING(40)})
  name: string

  @Column({type: DataType.INTEGER, defaultValue: 0})
  sortOrder: number

  creator: { uid: number; nickname: string };
}