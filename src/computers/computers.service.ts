import { Injectable, NotFoundException } from '@nestjs/common';
import { Computer } from './computer.model';
import { v4 as uuid } from 'uuid';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';

@Injectable()
export class ComputersService {
  private computers: Computer[] = [];

  getAllComputers(): Computer[] {
    return this.computers;
  }

  getComputersWithFilters(filterDto: GetComputersFilterDto): Computer[] {
    const { search } = filterDto;

    let computers = this.getAllComputers();

    if (search) {
      computers = computers.filter((computer) => {
        if (
          computer.cpu?.includes(search) ||
          computer.ram?.includes(search) ||
          computer.ssd?.includes(search) ||
          computer.hdd?.includes(search) ||
          computer.room?.includes(search) ||
          computer.building?.includes(search)
        )
          return true;
        return false;
      });
    }
    return computers;
  }
  getComputerById(id: string): Computer {
    const found = this.computers.find((computer) => computer.id === id);

    if (!found) {
      throw new NotFoundException(`Computer with ID "${id}" not found`);
    }

    return found;
  }

  createComputer(computerDto: ComputerDto): Computer {
    const { cpu, ram, ssd, hdd, room, building } = computerDto;
    const newComputer: Computer = {
      id: uuid(),
      cpu,
      ram,
      ssd,
      hdd,
      room,
      building
    };
    this.computers.push(newComputer);
    return newComputer;
  }

  deleteComputer(id: string): void {
    const found = this.getComputerById(id);
    this.computers = this.computers.filter(
      (computer) => computer.id !== found.id,
    );
  }

  updateComputer(id: string, updateComputerDto: UpdateComputerDto): Computer {
    const computer = this.getComputerById(id);
    const { cpu, ram, ssd, hdd, room, building } = updateComputerDto;
    if (cpu) computer.cpu = cpu;
    if (ram) computer.ram = ram;
    if (ssd) computer.ssd = ssd;
    if (hdd) computer.hdd = hdd;
    if (room) computer.room = room;
    if (building) computer.building = building;
    return computer;
  }
}
