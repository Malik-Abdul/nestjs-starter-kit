import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/create-episode.dto';
import { Episode } from './entity/episode.entity';

const UNIQUE_VIOLATION_CODE = '23505';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async findAll(
    sort: 'asc' | 'desc' = 'asc',
    limit: number = 10,
    page: number = 1,
  ) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.episodeRepository.findAndCount({
      order: { name: sort === 'asc' ? 'ASC' : 'DESC' },
      take: limit,
      skip,
    });

    return {
      data,
      meta: {
        total,
        limit,
        page,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findFeatured() {
    return this.episodeRepository.find({
      where: { featured: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.episodeRepository.findOne({ where: { id } });
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    try {
      const episode = this.episodeRepository.create(createEpisodeDto);
      return await this.episodeRepository.save(episode);
    } catch (err: any) {
      if (err?.code === UNIQUE_VIOLATION_CODE) {
        throw new ConflictException(`Episode with name "${createEpisodeDto.name}" already exists`);
      }
      throw err;
    }
  }

  async update(updateEpisodeDto: UpdateEpisodeDto) {
    const { id, ...rest } = updateEpisodeDto;
    const episode = await this.episodeRepository.findOne({ where: { id } });
    if (!episode) return null;
    try {
      this.episodeRepository.merge(episode, rest);
      return await this.episodeRepository.save(episode);
    } catch (err: any) {
      if (err?.code === UNIQUE_VIOLATION_CODE) {
        throw new ConflictException(`Episode with name "${rest.name ?? episode.name}" already exists`);
      }
      throw err;
    }
  }

  async remove(id: string) {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    if (!episode) return null;
    await this.episodeRepository.softRemove(episode);
    return episode;
  }
}
