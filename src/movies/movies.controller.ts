// src/movies/movies.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    const movie = await this.moviesService.findOne(+id);
    if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }
}
