import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column('simple-array')
  genres: string[];

  @Column('float')
  rating: number;
}
