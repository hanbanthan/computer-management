import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user: User) => user.computers, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}


