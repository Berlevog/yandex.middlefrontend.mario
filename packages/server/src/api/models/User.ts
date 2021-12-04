import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Scopes, Table, HasMany } from "sequelize-typescript";
import { Theme } from "./Theme";
import { EmojiComment } from "./EmojiComment";
import { Emoji } from "./Emoji";

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
  id!: number;

  @ForeignKey(() => Theme)
  @Column
  themeName!: string;

  @BelongsTo(() => Theme)
  theme!: Theme;

  @HasMany(() => EmojiComment)
  emojiComments?: EmojiComment[];

  @Column
  name!: string;

  @Column
  avatar!: string;
}
