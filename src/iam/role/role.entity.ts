import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table
export class Role extends Model {
  @Column({
    type: DataTypes.STRING
  })
  name: string

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING)
  })
  permissions: string[]

  @Column({
    type: DataTypes.STRING
  })
  createdBy: string

}
