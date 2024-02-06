import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Topic } from './Topic';

@Table
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    field: 'commentId',
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'topicId',
  })
  topicId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'userId',
  })
  userId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @BelongsTo(() => Topic)
  topic!: Topic;
}
