import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface SocialMediaAttr {
    name: string;
    link: string,
    icon: string;
}


@Table({ tableName: "SocialMedia" })
export class SocialMedia extends Model<SocialMedia, SocialMediaAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING
    })
    link: string;

    @Column({
        type: DataType.STRING
    })
    icon: string;
}
