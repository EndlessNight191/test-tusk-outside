import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreate {
  email: string,
  password: string,
  nickname: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreate>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING(100), unique: true})
  email: string

  @Column({type: DataType.STRING(100)})
  password: string

  @Column({type: DataType.STRING(30), unique: true})
  nickname: string

  @Column({type: DataType.STRING(), allowNull: true})
  access_token: string

  @Column({type: DataType.STRING(), allowNull: true})
  refresh_token: string
}
