import { BeforeFind, Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { encrypt } from "../helper/encryption";

interface Options {
  applyHook: boolean;
}

@Table
export class Question extends Model {
  @Column({
    type: DataTypes.TEXT
  })
  question: string;

  @Column({
    type: DataTypes.ENUM("TRUE_OR_FALSE", "MULTIPLE_CHOICE")
  })
  type: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING)
  })
  options: string[];

  @Column({
    type: DataTypes.TEXT
  })
  correctOption: string;

  @Column({
    type: DataTypes.INTEGER
  })
  mark: number;

  @BeforeFind
  static async applyHook(instance: Question, options: Options) {
    if (options.applyHook) {
      instance.correctOption = await encrypt(instance.correctOption)
    }
  }

}