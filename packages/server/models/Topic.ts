import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Topic extends Model<Topic> {
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
    primaryKey: true,
    autoIncrement: true,
  })
  // @ts-ignore
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-ignore
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  // @ts-ignore
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  // @ts-ignore
  userId: number;
}
