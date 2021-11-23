import { Column, Model, Table, HasMany, DefaultScope } from "sequelize-typescript";
import { EmojiComment } from "./EmojiComment";

@Table({
  tableName: "emoji",
  timestamps: false,
})
export class Emoji extends Model<Emoji> {
  @Column
  name!: string;

  @HasMany(() => EmojiComment)
  emojiComments?: EmojiComment[];
}
