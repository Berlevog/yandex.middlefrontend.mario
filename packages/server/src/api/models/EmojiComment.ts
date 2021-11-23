import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Comment } from "./Comment";
import { Emoji } from "./Emoji";
import { User } from "./User";

@Table({
  underscored: true,
  updatedAt: false,
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ["comment_id", "emoji_id", "user_id"],
  //   },
  // ],
})
export class EmojiComment extends Model<EmojiComment> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Emoji)
  @Column
  emojiId!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Comment)
  @Column
  commentId!: number;
}
