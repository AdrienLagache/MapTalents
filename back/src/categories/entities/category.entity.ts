import { Dev } from 'src/devs/entities/dev.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  category: string;

  @OneToMany(() => Dev, (dev) => dev.category)
  devs: Dev[];
}
