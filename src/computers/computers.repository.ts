import { Repository } from 'typeorm';
import { Computer } from './computer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ComputersRepository {
  constructor(
    @InjectRepository(Computer)
    private readonly repo: Repository<Computer>,
  ) {}

  async getAllComputers(): Promise<Computer[]> {
    return await this.repo.find();
  }

  async getComputersWithFilters(
    filterDto: GetComputersFilterDto,
  ): Promise<Computer[]> {
    const { search } = filterDto;

    const query = this.repo.createQueryBuilder('computer');

    if (search) {
      query.andWhere(
        `(LOWER(computer.cpu) LIKE LOWER(:search) OR 
        LOWER(computer.ram) LIKE LOWER(:search) OR 
        LOWER(computer.ssd) LIKE LOWER(:search) OR 
        LOWER(computer.hdd) LIKE LOWER(:search) OR 
        LOWER(computer.room) LIKE LOWER(:search) OR 
        LOWER(computer.building) LIKE LOWER(:search))
        `,
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async getComputerById(id: string): Promise<Computer | null> {
    const computer = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!computer) {
      return null;
    }
    return computer;
  }

  async createComputer(
    data: ComputerDto,
    user: User,
  ): Promise<Computer | null> {
    const newComputer = this.repo.create({ ...data, user });
    const savedcomputer = await this.repo.save(newComputer);
    return await this.repo.findOne({ where: { id: savedcomputer.id } });
  }

  async updateComputer(id: string, data: ComputerDto): Promise<boolean> {
    const result = await this.repo.update(id, data);
    return (result.affected ?? 0) > 0;
  }

  async deleteComputer(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
