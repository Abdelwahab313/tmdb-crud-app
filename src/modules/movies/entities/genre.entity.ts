import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  tmdbId: number;
}
