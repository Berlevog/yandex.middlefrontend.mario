import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { Theme } from "./Theme";

@Scopes(() => ({
  withTheme: {
    include: [
      {
        model: Theme,
      },
    ],
  },
}))
@Table({
  tableName: "user",
  underscored: true,
  timestamps: false,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column
  apiUserId!: number;

  @ForeignKey(() => Theme)
  @Column
  themeName!: string;

  @BelongsTo(() => Theme)
  theme!: Theme;
}
