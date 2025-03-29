import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Computer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpu: string;

  @Column()
  ram: string;

  @Column()
  ssd: string;

  @Column()
  hdd: string;

  @Column()
  room: string;

  @Column()
  building: string;
}
