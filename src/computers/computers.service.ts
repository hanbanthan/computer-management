import { Injectable } from '@nestjs/common';
import { Computer } from './computer.model';
import { v4 as uuid } from 'uuid';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';

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
//   getComputerById(id: string): Computer {
//     return this.computers.find((computer) => computer.id === id);
//   }

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
    this.computers = this.computers.filter((computer) => computer.id !== id);
  }
}
