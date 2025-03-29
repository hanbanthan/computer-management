import { IsNotEmpty } from 'class-validator';

export class ComputerDto {
  @IsNotEmpty()
  cpu: string;

  @IsNotEmpty()
  ram: string;

  @IsNotEmpty()
  ssd: string;

  @IsNotEmpty()
  hdd: string;

  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  building: string;
}
