import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: jest.fn((sort: string, limit: number, page: number) => ({
      data: [{ id: sort }],
      meta: { total: 1, limit, page, totalPages: 1 },
    })),
    findFeatured: jest.fn(() => [{ id: '1', name: 'Episode 1', featured: true }]),
    findOne: jest.fn((id: string) => ({id: id})),
    create: jest.fn((input: any) => ({ id: '1', ...input })),
    update: jest.fn((input: any) => ({ id: '1', ...input })),
    remove: jest.fn((id: string) => ({id: id})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{provide: EpisodesService, useValue: mockEpisodesService}],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findOne', () => {
    it('should return an array of episodes', async () => {
      const episodeId = 'id'
      const result = await controller.findOne(episodeId)
      expect(result).toEqual({id: episodeId});
    });
  });
   describe('findAll', () => {
    it('should return paginated episodes', async () => {
      const result = await controller.findAll('asc', 10, 1);
      expect(mockEpisodesService.findAll).toHaveBeenCalledWith('asc', 10, 1);
      expect(result).toMatchObject({
        data: expect.any(Array),
        meta: expect.objectContaining({
          total: expect.any(Number),
          limit: 10,
          page: 1,
          totalPages: expect.any(Number),
        }),
      });
      expect(result.data).toEqual([{ id: 'asc' }]);
    });
  });
  describe('findFeatured', () => {
    it('should return an array of featured episodes', async () => {
      const result = await controller.findFeatured();

      expect(mockEpisodesService.findFeatured).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
      result.forEach((episode: { id: string; name: string; featured: boolean }) => {
        expect(episode).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          featured: true,
        });
      });
    });
  });
  describe('when episode is not found', () => {
    it('should throw NotFoundException when service returns null', async () => {
      const episodeId = '6d94f4bc-f88a-4599-a88f-2a62a5b3d37e';
      (mockEpisodesService.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(controller.findOne(episodeId)).rejects.toThrow('Episode not found');
      expect(mockEpisodesService.findOne).toHaveBeenCalledWith(episodeId);
    });
  });
  describe('create', () => {
    it('should create an episode', async () => {
      const createBody = { name: 'New Episode' };
      const expected = mockEpisodesService.create(createBody);
      const result = await controller.create(createBody);

      expect(mockEpisodesService.create).toHaveBeenCalledWith(createBody);
      expect(result).toEqual(expected);
    });
  });
  describe('update', () => {
    const updateBody = { name: 'New Episode' };
    it('should update an episode', async () => {
      const expected = mockEpisodesService.update(updateBody);
      const result = await controller.update(updateBody);

      expect(mockEpisodesService.update).toHaveBeenCalledWith(updateBody);
      expect(result).toEqual(expected);
    });
  });
  describe('remove', () => {
    it('should remove an episode', async () => {
      const result = await controller.remove('asc');
      expect(result).toEqual({ id: 'asc' });
    });
  });
});
