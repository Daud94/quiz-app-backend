import { AfterFind, BeforeCreate, Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { hash } from "../utils/util";
import { encrypt } from "../helper/encryption";

@Table
export class Question extends Model{
  @Column({
    type: DataTypes.TEXT
  })
  question: string

  @Column({
    type: DataTypes.ENUM('TRUE_OR_FALSE','MULTIPLE_CHOICE')
  })
  type: string

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING)
  })
  options: string[]

  @Column({
    type: DataTypes.TEXT
  })
  correctOption: string

  @Column({
    type: DataTypes.INTEGER
  })
  mark: number

  @AfterFind
  static async hashPassword(instance: Question) {
    instance.correctOption = await encrypt(instance.correctOption)
  }

}