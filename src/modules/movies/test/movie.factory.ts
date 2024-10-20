import { DeepPartial } from 'typeorm';
import { Movie } from '../entities/movie.entity';

export function createMockMovie(overrides: DeepPartial<Movie> = {}): Movie {
  return {
    id: 1,
    title: 'Test Movie',
    releaseDate: new Date('2023-01-01'),
    averageRating: 8.5,
    ...overrides,
  } as Movie;
}
