import { IsOptional, IsString } from 'class-validator';

export class GetComputersFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
