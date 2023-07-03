import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface WorkedAttr {
    name: string;
    link: string,
}


@Table({ tableName: "workeds" })
export class Worked extends Model<Worked, WorkedAttr>{
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
}
