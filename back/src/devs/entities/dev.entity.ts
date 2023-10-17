import { Language } from 'src/languages/entities/language.entity';
import { SoftSkill } from 'src/softskills/entities/softskills.entity';
import { Techno } from 'src/technos/entities/techno.entity';
import { Tool } from 'src/tools/entities/tool.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

export enum Availability {
  DISPONIBLE = 'Disponible',
  INDISPONIBLE = 'Indisponible',
}

export enum Remote {
  TELE = 'Télétravail uniquement',
  SITE = 'Sur site',
  TELE_SITE = 'Télétravail / Sur site',
}

@Entity()
export class Dev {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 255, nullable: false })
  address: string;

  @Column('varchar', { length: 255, nullable: false })
  city: string;

  @Column('varchar', { length: 255, nullable: false })
  zip_code: string;

  @Column('varchar', { length: 255, nullable: false })
  country: string;

  @Column('numeric', { nullable: false })
  adr: number;

  @Column({ nullable: false })
  experience: Date;

  @Column('decimal', { precision: 10, scale: 7, nullable: false })
  longitude: number;

  @Column('decimal', { precision: 10, scale: 7, nullable: false })
  latitude: number;

  @Column()
  activity_area: number;

  @Column({
    type: 'enum',
    enum: Availability,
    default: Availability.DISPONIBLE,
  })
  availability: string;

  @Column({
    type: 'enum',
    enum: Remote,
    default: Remote.TELE_SITE,
  })
  remote: string;

  @Column('varchar', { length: 128 })
  favorite_techno: string;

  @OneToOne(() => User, (user) => user.dev, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Techno)
  @JoinTable()
  techno: Techno[];

  @ManyToMany(() => Language)
  @JoinTable()
  language: Language[];

  @ManyToMany(() => SoftSkill)
  @JoinTable()
  softSkill: SoftSkill[];

  @ManyToMany(() => Tool)
  @JoinTable()
  tool: Tool[];

  @ManyToOne(() => Category, (category) => category.devs)
  category: Category;
}
