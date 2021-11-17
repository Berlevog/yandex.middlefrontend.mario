import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Comment } from "./Comment";
import { Emoji } from "./Emoji";

@Table({
  underscored: true,
})
export class EmojiComment extends Model<EmojiComment> {
  @ForeignKey(() => Emoji)
  @Column
  emojiId!: number;

  @ForeignKey(() => Comment)
  @Column
  commentId!: number;
}
