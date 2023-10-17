import { Dev } from 'src/devs/entities/dev.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  mail: string;

  @Column('varchar', { length: 128, nullable: false })
  password: string;

  @Column('varchar', { length: 128, nullable: false })
  firstname: string;

  @Column('varchar', { length: 128, nullable: false })
  lastname: string;

  @Column('text')
  image: string;

  @Column('varchar', { length: 128, nullable: false })
  role_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @OneToOne(() => Dev, (dev) => dev.user, { onDelete: 'CASCADE' })
  dev: Dev;
}
