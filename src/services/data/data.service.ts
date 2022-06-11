import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {Arcticle} from 'src/entities/arcticle.entity';
import {Tags} from 'src/entities/tags.entity';
import {ArcticleTags} from 'src/entities/arcticletags.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Logger } from '@nestjs/common';



@Injectable()
export class DataService {
    constructor( 
    @InjectRepository(Arcticle) private arcticleRepository: Repository<Arcticle>,
    @InjectRepository(Tags) private tagsRepository: Repository<Tags>,
    @InjectRepository(ArcticleTags) private arcticleTagsRepository: Repository<ArcticleTags>,
    private http: HttpService) {}

  
    async addData(url: string) {
  
      // get the data from url and register every value in the database
      return  await firstValueFrom(this.http.get(url))
      .then(response => {
        response.data.hits.forEach(arcticle => {
          this.registerArcticle(arcticle);
          
        });
        return 'Cronjob Done';
      })
      .catch(err => {}  );

    }


    // get the important data fron arcticles and register in the database
    async registerArcticle(incomingArcticle: any) {

        const newArcticle = new Arcticle();
        // in case title is null get story title
        if(incomingArcticle.title){
          newArcticle.title = incomingArcticle.title;
        }else{
          newArcticle.title = incomingArcticle.story_title;
        }
        newArcticle.comment_text = incomingArcticle.comment_text;
        newArcticle.author = incomingArcticle.author;
        newArcticle.creation_date = DateTime.now().toISO();
        newArcticle.origin_date = incomingArcticle.created_at;
        newArcticle.external_id = incomingArcticle.story_id;
        newArcticle.is_public = true;
        await this.arcticleRepository.save(newArcticle)
        .then(async res => {
          Logger.log('Success register: ' + newArcticle.id);
          // if the arcticle in the database this will enter all their tags
          await this.registerTags(incomingArcticle._tags, newArcticle.id);
        })
        .catch(err => {
          Logger.error(err+ ' external_code: ' + newArcticle.external_id);
        });
        
    }


    // function that register the incoming tags
    async registerTags(incomingTags: any, Arcticle_id: number) {

      await incomingTags.forEach(async  tag => {
        // search if the tag is created in the database
        await this.tagsRepository.findOne({where: {name: tag}}).then(async findedtag  => {
          // if is not finded in the database it will register 
          if(!findedtag){
            const newTag = new Tags();
            newTag.name = tag;
            newTag.created_date = DateTime.now().toISO();
            await this.tagsRepository.save(newTag)
            .then(async res => {
              Logger.log('register tag success: ' + newTag.id);
              // asociate the tag in the arcticle
              await this.registerArcticleTags(newTag.id, Arcticle_id);
            })
            .catch(err => {
              Logger.error(err+ ' tag id: ' + newTag.name);
            });
          }else{
            // asociate the finded tag in the arcticle
            await this.registerArcticleTags(findedtag.id, Arcticle_id);
          }
        }).catch(err => {
          Logger.error(err);
        } );
      });
      
    }

    // function that register the asociation between the arcticle and the tag
    async registerArcticleTags(tag_id: number, arcticle_id: number) {

        const newArcticleTags = new ArcticleTags();
        newArcticleTags.arcticleId = arcticle_id;
        newArcticleTags.tagsId = tag_id;
        await this.arcticleTagsRepository.save(newArcticleTags).then(res => {
          Logger.log(res);
        }).catch(err => {
          Logger.error(err+ ' id: ' + newArcticleTags.id);
        } );
    }

}
