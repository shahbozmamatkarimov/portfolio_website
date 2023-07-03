import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface SkillAttr {
    name: string;
    icon: string,
}


@Table({ tableName: "skills" })
export class Skill extends Model<Skill, SkillAttr>{
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
    icon: string;
}
