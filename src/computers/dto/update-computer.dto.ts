import { IsOptional } from 'class-validator';

export class UpdateComputerDto {
  @IsOptional()
  cpu: string;

  @IsOptional()
  ram: string;

  @IsOptional()
  ssd: string;

  @IsOptional()
  hdd: string;

  @IsOptional()
  room: string;

  @IsOptional()
  building: string;
}
