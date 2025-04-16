import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { ComputersRepository } from './computers.repository';
import { Computer } from './computer.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ComputersService {
  constructor(private readonly computersRepository: ComputersRepository) { }

  async getAllComputers(): Promise<Computer[]> {
    return this.computersRepository.getAllComputers();
  }

  async getComputersWithFilters(
    filterDto: GetComputersFilterDto,
  ): Promise<Computer[]> {
    return this.computersRepository.getComputersWithFilters(filterDto);
  }

  async getComputerById(id: string): Promise<Computer | null> {
    return this.computersRepository.getComputerById(id);
  }

  async createComputer(data: ComputerDto, user: User): Promise<Computer> {
    if (
      !data.cpu &&
      !data.ram &&
      !data.ssd &&
      !data.hdd &&
      !data.room &&
      !data.building
    ) {
      throw new BadRequestException('Computer must have a body.');
    }
    try {
      const newComputer = await this.computersRepository.createComputer(
        data,
        user,
      );
      if (!newComputer) {
        throw new InternalServerErrorException('Failed to create computer.');
      }
      return newComputer;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create computer.');
    }
  }

  async deleteComputer(id: string, user: User): Promise<boolean> {
    const computer = await this.computersRepository.getComputerById(id);

    if (!computer) {
      throw new NotFoundException(`Computer with ID ${id} not found.`);
    }

    if (computer.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this post.');
    }

    try {
      const success = await this.computersRepository.deleteComputer(id);
      return success;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete computer.');
    }
  }

  async updateComputer(id: string, data: UpdateComputerDto, user: User) {
    if (
      !data.cpu &&
      !data.ram &&
      !data.ssd &&
      !data.hdd &&
      !data.room &&
      !data.building
    )
      return null;

    const computer = await this.computersRepository.getComputerById(id);

    if (!computer) {
      throw new NotFoundException(`Computer with ID ${id} not found.`);
    }

    if (computer.user.id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this computer.',
      );
    }

    const patchData: ComputerDto = {
      cpu: data.cpu ?? computer.cpu,
      ram: data.ram ?? computer.ram,
      ssd: data.ssd ?? computer.ssd,
      hdd: data.hdd ?? computer.hdd,
      room: data.room ?? computer.room,
      building: data.building ?? computer.building,
    };

    try {
      const success = await this.computersRepository.updateComputer(
        id,
        patchData,
      );
      return success;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update th computer.');
    }
  }
}
