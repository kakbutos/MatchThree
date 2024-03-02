import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  indexes: [
    {
      name: 'userIndex',
      fields: ['userId'],
    },
  ],
  timestamps: false,
})
export class UserTheme extends Model<UserTheme> {
  @Column({
    type: DataType.INTEGER,
    field: 'userThemeId',
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  theme!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'userId',
  })
  userId!: number;
}
