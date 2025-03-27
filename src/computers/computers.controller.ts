import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ComputersService } from './computers.service';
import { Computer } from './computer.model';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';

@Controller('computers')
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Get()
  getComputers(@Query() filterDto: GetComputersFilterDto): Computer[] {
    if (Object.keys(filterDto).length) {
      return this.computersService.getComputersWithFilters(filterDto);
    } else {
      return this.computersService.getAllComputers();
    }
  }

//   @Get(':/id')
//   getComputerById(@Param('id') id: string): Computer {
//     return this.computersService.getComputerById(id);
//   }

  @Post()
  createComputer(@Body() computerDto: ComputerDto): Computer {
    return this.computersService.createComputer(computerDto);
  }

  @Delete('/:id')
  deleteComputer(@Param('id') id: string): void {
    this.computersService.deleteComputer(id);
  }
}
