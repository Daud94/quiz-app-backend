import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../user/user.entity";


@Table
export class Attempt extends Model{

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING)
  })
  attemptedQuestions: string[]

  @Column({
    type: DataTypes.DECIMAL(10, 2)
  })
  score: number

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.STRING
  })
  userId: string

  @BelongsTo(() => User)
  user: User
}