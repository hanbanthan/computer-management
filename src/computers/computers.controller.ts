import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ComputersService } from './computers.service';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('computers')
@UseGuards(AuthGuard())
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Get()
  async getComputers(@Query() filterDto: GetComputersFilterDto) {
    if (Object.keys(filterDto).length) {
      const computers =
        await this.computersService.getComputersWithFilters(filterDto);
      return {
        message: 'List of all computers with filters retrieved successfully',
        computers: computers,
      };
    } else {
      const computers = await this.computersService.getAllComputers();
      return {
        message: 'List of all computers retrieved successfully',
        computers: computers,
      };
    }
  }

  @Get('/:id')
  async getComputerById(@Param('id') id: string) {
    const computer = await this.computersService.getComputerById(id);
    if (computer) {
      return {
        message: 'Computer retrieved successfully',
        computer: computer,
      };
    }
    throw new NotFoundException('Computer not found');
  }

  @Post()
  async createComputer(@Body() computerDto: ComputerDto) {
    const computer = await this.computersService.createComputer(computerDto);
    if (computer) {
      return {
        message: 'Computer created successfully',
        computer: computer,
      };
    }
    throw new NotFoundException('Computer creation unsuccessful');
  }

  @Delete('/:id')
  async deleteComputer(@Param('id') id: string) {
    const result = await this.computersService.deleteComputer(id);

    if (result === null) throw new NotFoundException('Computer not found');

    return { message: 'Computer deleted successfully' };
  }

  @Patch('/:id')
  updateComputer(
    @Param('id') id: string,
    @Body() updateComputerDto: UpdateComputerDto,
  ) {
    const updatedComputer = this.computersService.updateComputer(
      id,
      updateComputerDto,
    );

    if (updatedComputer === null)
      throw new NotFoundException('Computer not found');

    return { message: 'Computer updated successfully' };
  }
}
