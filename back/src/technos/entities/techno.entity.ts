import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Techno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 128, nullable: false })
  techno: string;

  @Column('text', { nullable: false })
  logo: string;
}
