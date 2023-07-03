import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Users } from "src/users/models/user.model";

interface MessageAttr {
    user_id: number;
    message: string,
}


@Table({ tableName: "messages" })
export class Message extends Model<Message, MessageAttr>{
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

    @Column({
        type: DataType.STRING
    })
    message: string;
}
