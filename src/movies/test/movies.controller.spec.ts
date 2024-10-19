import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { NotFoundException } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  describe('findOne', () => {
    it('should return a movie if it exists', async () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Test Movie',
        releaseDate: new Date('2023-01-01'),
        genres: ['Action', 'Drama'],
        rating: 8.5,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockMovie);

      expect(await controller.findOne('1')).toBe(mockMovie);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if movie does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
