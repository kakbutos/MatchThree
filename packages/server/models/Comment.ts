import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Topic } from './Topic';
import { Reply } from './Reply';

@Table({
  indexes: [
    {
      name: 'topicIdIndex',
      fields: ['topicId'],
    },
  ],
})
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

  @HasMany(() => Reply, 'commentId')
  replies!: Reply[];

  @BelongsTo(() => Topic)
  topic!: Topic;
}
