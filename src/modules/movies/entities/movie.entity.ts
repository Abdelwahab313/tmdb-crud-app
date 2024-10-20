import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column('float')
  averageRating: number;

  @Column('int')
  tmdbId: number;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'movie_genre',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];
}
