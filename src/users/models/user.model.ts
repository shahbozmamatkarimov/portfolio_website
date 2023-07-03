import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Comment } from "src/comments/models/comment.model";
import { Message } from "src/messages/models/message.model";

interface UsersAttr {
    email: string,
    password: string,
    role: string
}


@Table({ tableName: "users" })
export class Users extends Model<Users, UsersAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    email: string;

    @Column({
        type: DataType.STRING
    })
    password: string;

    @Column({
        type: DataType.STRING
    })
    role: string;

    @Column({
        type: DataType.STRING
    })
    hashed_token: string

    @HasMany(() => Message)
    message: Message

    @HasMany(() => Comment)
    comment: Comment
}
