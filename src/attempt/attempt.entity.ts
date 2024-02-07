import {Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";


@Table
export class Attempt extends Model{

  @Column({
    type: DataTypes.ARRAY(DataTypes.JSON)
  })
  attemptedQuestions: string

  @Column({
    type: DataTypes.DECIMAL(10, 2)
  })
  score: number

}