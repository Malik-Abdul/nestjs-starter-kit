import { Controller, Get, Param, Query, Post, Put, Delete, Body } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
    @Get()
    findAll(@Query('sort') sort: 'asc'|'desc' = 'asc'): string {
        console.log(sort)
        return 'This action returns all episodes';
    }
    @Get('featured')
    findFeatured():string{
        return 'This action returns featured episodes';
    }
    @Get(':id')
    findOne(@Param('id') id: string): string{
        return `This action returns a #id ${id}: episode`;
    }
    @Post()
    create(@Body() input: any): string {
        return 'This action adds a new episode';
    }
    @Put()
    update(@Body() input: any): string {
        return 'This action updates a new episode';
    }
    @Delete()
    remove(@Param('id') id: string): string {  
        return 'This action removes a new episode';
    }
}
