import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Post } from "src/posts/models/post.model";
import { Users } from "src/users/models/user.model";

interface CommentAttr {
    user_id: number;
    post_id: number;
    comment: string,
}


@Table({ tableName: "comments" })
export class Comment extends Model<Comment, CommentAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number;
    @BelongsTo(() => Users)
    user: Users

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER
    })
    post_id: number;
    @BelongsTo(() => Post)
    post: Post

    @Column({
        type: DataType.STRING
    })
    comment: string;
}
