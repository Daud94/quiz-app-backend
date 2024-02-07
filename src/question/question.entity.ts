import {Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";


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

}