import { BeforeCreate, Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { hash } from "../utils/util";


@Table
export class User extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  userId: string;

  @Column({
    type: DataTypes.STRING
  })
  firstName: string;

  @Column({
    type: DataTypes.STRING
  })
  lastName: string;

  @Column({
    type: DataTypes.STRING
  })
  email: string;

  @Exclude()
  @Column({
    type: DataTypes.STRING,
  })
  password: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await hash(instance.password)
  }
}