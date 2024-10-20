// src/movies/movies.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ) {}

  async findOne(id: number): Promise<Movie | null> {
    return this.repository.findOne({ where: { id } });
  }
}
