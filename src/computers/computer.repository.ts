import { Repository } from 'typeorm';
import { Computer } from './computer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';

@Injectable()
export class ComputersRepository {
  constructor(
    @InjectRepository(Computer)
    private readonly repo: Repository<Computer>,
  ) {}

  async getAllComputers() {
    return await this.repo.find();
  }

  async getComputersWithFilters(filterDto: GetComputersFilterDto) {
    const { search } = filterDto;

    const query = this.repo.createQueryBuilder('computer');

    if (search) {
      query.andWhere(
        `computer.cpu LIKE :search OR 
        computer.ram LIKE :search OR 
        computer.ssd LIKE :search OR 
        computer.hdd LIKE :search OR 
        computer.room LIKE :search OR 
        computer.building LIKE :search
        `,
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async getComputerById(id: string) {
    const computer = await this.repo.findOne({ where: { id } });
    if (!computer) {
      return null;
    }
    return computer;
  }

  async createComputer(data: ComputerDto) {
    const newComputer = this.repo.create(data);
    return await this.repo.save(newComputer);
  }

  async updateComputer(id: string, data: ComputerDto) {
    return await this.repo.update(id, data);
  }

  async deleteComputer(id: string) {
    return await this.repo.delete(id);
  }
}
