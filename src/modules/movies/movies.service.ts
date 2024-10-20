import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findOne(id: number): Promise<Movie | null> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [movies, total] = await this.moviesRepository.findAndCount({
      take: limit,
      skip: skip,
      order: { id: 'ASC' }, // You can change the ordering as needed
    });

    return {
      data: movies,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
