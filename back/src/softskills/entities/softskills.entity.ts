import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SoftSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  softSkill: string;
}
