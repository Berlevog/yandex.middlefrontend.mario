import { BelongsTo, BelongsToMany, Column, DefaultScope, ForeignKey, Model, Table } from "sequelize-typescript";
import { Emoji } from "./Emoji";
import { EmojiComment } from "./EmojiComment";
import { Thread } from "./Thread";

@DefaultScope(() => ({
  include: [
    {
      model: Emoji,
      through: { attributes: [] },
    },
  ],
}))
@Table({
  tableName: "comment",
  underscored: true,
})
export class Comment extends Model<Comment> {
  @Column
  title!: string;

  @Column
  content!: string;

  @Column
  userId!: number;

  @ForeignKey(() => Thread)
  @Column
  threadId!: number;

  @BelongsTo(() => Thread, {
    onDelete: "CASCADE",
  })
  thread!: Thread;

  @BelongsToMany(() => Emoji, () => EmojiComment)
  emojies?: Emoji[];
}
