import { Controller, Get, Param, Query, Post, Put, Delete, Body } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';

@Controller('episodes')
export class EpisodesController {
    constructor(
        private readonly episodeService: EpisodesService, 
        private readonly configService: ConfigService
    ) {}
    @Get()
    findAll(@Query('sort') sort: 'asc'|'desc' = 'asc') {
        console.log(sort)
        this.episodeService.findAll(sort)
    }
    @Get('featured')
    findFeatured(){
        this.episodeService.findFeatured()
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        this.episodeService.findOne(id)
    }
    @Post()
    create(@Body() input: any) {
        this.episodeService.create(input)
    }
    @Put()
    update(@Body() input: any) {
        this.episodeService.update(input)
    }
    @Delete()
    remove(@Param('id') id: string) {  
        this.episodeService.remove(id)
    }
}
