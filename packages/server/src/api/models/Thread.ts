import { BelongsTo, Column, ForeignKey, HasMany, Model, Scopes, Table } from "sequelize-typescript";
import { Comment } from "./Comment";
import { User } from "./User";

@Scopes(() => ({
  withComments: {
    include: [
      {
        model: Comment,
      },
      {
        model: User,
        attributes: ["name", "avatar"],
      },
    ],
    order: [["id", "DESC"]],
  },
}))
@Table({
  tableName: "thread",
  underscored: true,
})
export class Thread extends Model<Thread> {
  @Column
  title!: string;

  @Column
  content!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Comment)
  comments!: Comment[];
}
