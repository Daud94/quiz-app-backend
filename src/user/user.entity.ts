import { Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import * as bcrypt from 'bcrypt';


@Table
export class User extends Model {
  @Column({
    type: DataTypes.STRING
  })
  firstName: string

  @Column({
    type: DataTypes.STRING
  })
  lastName: string

  @Column({
    type: DataTypes.STRING
  })
  email: string

  @Column({
    type: DataTypes.STRING,
    async set(value){
      // @ts-ignore
      const hash = bcrypt.hash(value, process.env["SALT_OR_ROUNDS "])
      this.setDataValue('password',hash)
    }
  })
  password: string
}