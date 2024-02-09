import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Comment } from './Comment';

@Table
export class Reply extends Model<Reply> {
  @Column({
    type: DataType.INTEGER,
    field: 'replyId',
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'commentId',
  })
  commentId!: number;

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

  @BelongsTo(() => Comment, { foreignKey: 'commentId' })
  comment!: Comment;
}
