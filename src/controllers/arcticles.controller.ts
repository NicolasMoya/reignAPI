import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, Delete } from '@nestjs/common';
import { ArcticlesService } from 'src/services/arcticles/arcticles.service';

@Controller('arcticles')
export class ArcticlesController {

    constructor(private readonly arcticlesService: ArcticlesService) {}

    @Get('')
    async getArcticle(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 5,
        @Query('title') title: string,
        @Query('author') author: string,
        @Query('tag') tag: string
    ){
        // this can change in case to extend te limit
        limit = 5;

        // constructor of filters
        var filters = {
            title: title,
            author: author,
            tag: tag,
        };

        // if page is invalid will return message
        if(page < 1){
            return 'Enter a valid page number';
        }

        return await this.arcticlesService.getArcticles(filters,page, limit);
    }

    @Delete('')
    async deleteUser(@Query('id') id: number) {
      return await this.arcticlesService.deleteArcticle(id);
    }




}
