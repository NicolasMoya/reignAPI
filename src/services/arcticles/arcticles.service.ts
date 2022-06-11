import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Arcticle } from 'src/entities/arcticle.entity';
import { Tags } from 'src/entities/tags.entity';
import { ArcticleTags } from 'src/entities/arcticletags.entity';
import * as _ from 'lodash';


@Injectable()
export class ArcticlesService {

    constructor(
        @InjectRepository(Arcticle) private arcticleRepository: Repository<Arcticle>,
    ) {}


    // get the arcticles based in the filters given
    async getArcticles(filters: any, page: number, limit: number): Promise<any> {

        // get all the data joining the tables
        const queryBuilder = this.arcticleRepository.createQueryBuilder('arc');
        await queryBuilder.innerJoinAndSelect('arc.arctag', 'ac', 'ac.arcticleId = arc.id')
        .innerJoinAndSelect('ac.tags', 'w', 'ac.tagsId = w.id')
        // get the non deleted elements
        .where('arc.is_public = :is_public', { is_public: true });




        // apply the filters in all the cases (in a partial match)
        if(filters.title){
            queryBuilder.where('arc.title like :title', {title:`%${filters.title}%`});
        }

        if(filters.author){
            queryBuilder.where('arc.author like :author', {author:`%${filters.author}%`});
        }

        if(filters.tag){
            queryBuilder.where('w.name like :tag', {tag:`%${filters.tag}%`});
        }

        // calculate the items of pagination
        const currentpage: number = page;
        var totalitems = (await queryBuilder.getMany()).length;
        var totalpages = Math.ceil(totalitems / limit);


        // create json with the paginations
        var returnedJSON:any = {};

        returnedJSON.data = (await queryBuilder.getMany());
        returnedJSON.data = (await queryBuilder.getMany()).splice((currentpage - 1) * limit,limit);        
        returnedJSON.meta = {totalitems, currentpage, totalpages};

        return returnedJSON;
    }

    // delete an arcticle based on id (change status)
    async deleteArcticle(id: number) {
        const arcticle = await this.arcticleRepository.findOne({where: {id: id}});
        if(arcticle.is_public){
            arcticle.is_public = false;
        }else{
            return 'The arcticle is already deleted';
        }  
        return await this.arcticleRepository.save(arcticle).then(() => {return 'Arcticle deleted :'+ arcticle.title +' ('+arcticle.id+')'}).catch((err) => {Logger.error(err)});
    }

}
