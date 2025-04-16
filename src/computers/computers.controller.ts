/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-useless-catch */
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ComputersService } from './computers.service';
import { ComputerDto } from './dto/computer.dto';
import { GetComputersFilterDto } from './dto/get-computers-filter.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Computer } from './computer.entity';

@Controller('computers')
@UseGuards(AuthGuard())
export class ComputersController {
  constructor(private readonly computersService: ComputersService) { }

  @Get()
  async getComputers(
    @Query() filterDto: GetComputersFilterDto,
  ): Promise<{ message: string; computers: Computer[] }> {
    if (Object.keys(filterDto).length) {
      try {
        const computers =
          await this.computersService.getComputersWithFilters(filterDto);
        return {
          message: 'List of all computers with filters retrieved successfully',
          computers: computers,
        };
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const computers = await this.computersService.getAllComputers();
        return {
          message: 'List of all computers retrieved successfully',
          computers: computers,
        };
      } catch (error) {
        throw error;
      }
    }
  }

  @Get('/:id')
  async getComputerById(
    @Param('id') id: string,
  ): Promise<{ message: string; computer: Computer }> {
    try {
      const computer = await this.computersService.getComputerById(id);
      if (!computer) {
        throw new NotFoundException('Computer not found.');
      }

      return { message: 'Computer retrieved successfully.', computer };
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createComputer(
    @Body() computerDto: ComputerDto,
    @GetUser() user: User,
  ): Promise<{ message: string; computer: Computer }> {
    try {
      const newcomputer = await this.computersService.createComputer(
        computerDto,
        user,
      );

      if (!newcomputer) {
        throw new InternalServerErrorException(
          'Computer creation failed for an unknown reason.',
        );
      }

      return {
        message: 'Computer created successfully',
        computer: newcomputer,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async deleteComputer(
    @Param('id') id: string,
    @GetUser() user: User,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const success = await this.computersService.deleteComputer(id, user);
      if (!success) {
        throw new InternalServerErrorException(
          'Post deletion failed for an unknown reason.',
        );
      }
      res.status(204).send();
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  async updateComputer(
    @Param('id') id: string,
    @Body() updateComputerDto: UpdateComputerDto,
    @GetUser() user: User,
  ): Promise<{ message: string; computer: Computer }> {
    try {
      const success = await this.computersService.updateComputer(
        id,
        updateComputerDto,
        user,
      );

      if (!success) {
        throw new InternalServerErrorException(
          'Computer updated failed for an unknow reason.',
        );
      }
      const updatedComputer = await this.computersService.getComputerById(id);
      if (!updatedComputer) {
        throw new NotFoundException('Computer not found after update.');
      }

      return {
        message: 'Computer updated successfully',
        computer: updatedComputer
      };
    } catch (error) {
      throw error;
    }
  }
}
