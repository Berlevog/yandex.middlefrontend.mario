import { BelongsToMany, Column, DefaultScope, Model, Table } from "sequelize-typescript";
import { EmojiComment } from "./EmojiComment";
import { Comment } from "./Comment";

@Table({
  tableName: "emoji",
  timestamps: false,
})
export class Emoji extends Model<Emoji> {
  @Column
  name!: string;

  @BelongsToMany(() => Comment, () => EmojiComment)
  comment!: Comment[];
}
