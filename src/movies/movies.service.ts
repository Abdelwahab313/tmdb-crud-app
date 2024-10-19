// src/movies/movies.service.ts
import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movies.repository';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findOne(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne(id);
  }
}
