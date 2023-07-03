import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface AboutUsAttr {
    avatar: string;
    fullname: string,
    phone: string;
    email: string;
    birthday: string;
    age: number;
    about: string;
    experience: string;
}


@Table({ tableName: "aboutUs" })
export class AboutUs extends Model<AboutUs, AboutUsAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    avatar: string;

    @Column({
        type: DataType.STRING
    })
    fullname: string;

    @Column({
        type: DataType.STRING
    })
    phone: string;

    @Column({
        type: DataType.STRING
    })
    email: string;

    @Column({
        type: DataType.STRING
    })
    birthday: string;

    @Column({
        type: DataType.INTEGER
    })
    age: number;

    @Column({
        type: DataType.STRING
    })
    about: string;

    @Column({
        type: DataType.STRING
    })
    experience: string;
}
