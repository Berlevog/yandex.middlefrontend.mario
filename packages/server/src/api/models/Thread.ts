import { Column, HasMany, Model, Scopes, Table } from "sequelize-typescript";
import { Comment } from "./Comment";

@Scopes(() => ({
  withComments: {
    include: [
      {
        model: Comment,
      },
    ],
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

  @Column
  userId!: number;

  @HasMany(() => Comment)
  comments!: Comment[];
}
