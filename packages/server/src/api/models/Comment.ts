import {
  BelongsTo,
  Column,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { EmojiComment } from "./EmojiComment";
import { Thread } from "./Thread";
import { User } from "./User";

@DefaultScope(() => ({
  include: [
    {
      model: EmojiComment,
    },
    {
      model: User,
      attributes: ["name", "avatar"],
    },
  ],
  order: [["id", "ASC"]],
}))
@Table({
  tableName: "comment",
  underscored: true,
})
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  title!: string;

  @Column
  content!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User, {
    onDelete: "CASCADE",
  })
  user!: User;

  @ForeignKey(() => Thread)
  @Column
  threadId!: number;

  @BelongsTo(() => Thread, {
    onDelete: "CASCADE",
  })
  thread!: Thread;

  @HasMany(() => EmojiComment)
  emojiComments?: EmojiComment[];
}
