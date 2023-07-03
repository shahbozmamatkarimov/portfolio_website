import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './models/project.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectRepo: typeof Project) { }

  async create(createProjectDto: CreateProjectDto) {
    await this.projectRepo.create({ ...createProjectDto });
    const response = {
      msg: "Project created successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.projectRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Project> {
    return await this.projectRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.projectRepo.update(updateProjectDto, { where: { id } })

    const response = {
      msg: "Project update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.projectRepo.destroy({ where: { id } });

    const response = {
      msg: "Project delete successfuly!"
    }
    return response;
  }
}
