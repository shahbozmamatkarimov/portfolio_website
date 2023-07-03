import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "src/comments/models/comment.model";

interface PostAttr {
    content: string;
    title: string,
    description: string;
    teg: string;
}


@Table({ tableName: "posts" })
export class Post extends Model<Post, PostAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    content: string;

    @Column({
        type: DataType.STRING
    })
    title: string;

    @Column({
        type: DataType.STRING
    })
    description: string;

    @Column({
        type: DataType.STRING
    })
    teg: string;

    @HasMany(() => Comment)
    comment: Comment
}
