import { Injectable } from '@nestjs/common';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { ComputersRepository } from './computers.repository';
import { Computer } from './computer.entity';

@Injectable()
export class ComputersService {
  constructor(private readonly computersRepository: ComputersRepository) {}

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

  async createComputer(data: ComputerDto): Promise<Computer | null> {
    if (
      !data.cpu &&
      !data.ram &&
      !data.ssd &&
      !data.hdd &&
      !data.room &&
      !data.building
    )
      return null;

    const newComputer = await this.computersRepository.createComputer(data);
    return newComputer;
  }

  async deleteComputer(id: string) {
    const computer = this.computersRepository.getComputerById(id);
    if (!computer) return null;
    return this.computersRepository.deleteComputer(id);
  }

  async updateComputer(id: string, data: UpdateComputerDto) {
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

    if (!computer) return null;

    const patchData: ComputerDto = {
      cpu: data.cpu ?? computer.cpu,
      ram: data.ram ?? computer.ram,
      ssd: data.ssd ?? computer.ssd,
      hdd: data.hdd ?? computer.hdd,
      room: data.room ?? computer.room,
      building: data.building ?? computer.building,
    };

    return this.computersRepository.updateComputer(id, patchData);
  }
}
