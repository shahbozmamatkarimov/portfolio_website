import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface ProjectAttr {
    name: string;
    image: string;
    link_project_ui: string;
    link_project_code: string;
    description: string;
}


@Table({ tableName: "projects" })
export class Project extends Model<Project, ProjectAttr>{
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
    image: string;

    @Column({
        type: DataType.STRING
    })
    link_project_ui: string;

    @Column({
        type: DataType.STRING
    })
    link_project_code: string;

    @Column({
        type: DataType.STRING
    })
    description: string;
}
