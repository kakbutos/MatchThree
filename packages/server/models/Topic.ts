import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Topic extends Model<Topic> {
  @Column({
    type: DataType.INTEGER,
    field: 'topicId',
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'userId',
  })
  userId!: number;
}
