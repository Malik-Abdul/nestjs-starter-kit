import { Controller, Get, Param, Query, Post, Put, Delete, Body, NotFoundException, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';
import { UuidParam } from 'src/common/decorators/uuid-param.decorator';
import { IsPositivePipe } from 'src/common/pipes/is-positive.pipe';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Controller('episodes')
export class EpisodesController {
    constructor(
        private readonly episodeService: EpisodesService, 
        private readonly configService: ConfigService
    ) {}
    // @Get()
    // async findAll(
    //     @Query('sort') sort: 'asc' | 'desc' = 'asc',
    //     @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    // ) {
    //     return this.episodeService.findAll(sort, limit);
    // }
    @Get()
    async findAll(
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe, IsPositivePipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe, IsPositivePipe) page: number,
    ) {
        return this.episodeService.findAll(sort, limit, page);
    }
    // @Get(':id')
    // async findOne(@Param('id') id: string){
    //     const episode = await this.episodeService.findOne(id)
    //     if (!episode) throw new NotFoundException('Episode not found')
    //     return episode
    // }
    // @Get(':id')
    // async findOne(
    // @Param(
    //     'id',
    //     new ParseUUIDPipe({
    //     version: '4',
    //     exceptionFactory: () =>
    //         new NotFoundException('Episode not found'),
    //     }),
    // )
    // id: string,
    // ) {
    // const episode = await this.episodeService.findOne(id);

    // if (!episode) {
    //     throw new NotFoundException('Episode not found');
    // }

    // return episode;
    // }
    @Get(':id')
    async findOne(@UuidParam('id', 'Episode not found') id: string) {
    const episode = await this.episodeService.findOne(id);

    if (!episode) {
        throw new NotFoundException('Episode not found');
    }

    return episode;
    }
    @Get('featured')
    async findFeatured(){
        const episodes = await this.episodeService.findFeatured()
        return episodes
        return this.episodeService.findFeatured()
    }
    @Post()
    async create(@Body() input: CreateEpisodeDto) {
        const episode = await this.episodeService.create(input)
        return episode
        return this.episodeService.create(input)
    }
    @Put()
    async update(@Body() input: any) {
        const episode = await this.episodeService.update(input)
        return episode
        return this.episodeService.update(input)
    }
    @Delete()
    async remove(@Param('id') id: string) {  
        const episode = await this.episodeService.remove(id)
        return episode
        return this.episodeService.remove(id)
    }
}
