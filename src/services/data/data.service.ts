import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {  firstValueFrom } from 'rxjs';
import {Arcticle} from 'src/entities/arcticle.entity';
import {Tags} from 'src/entities/tags.entity';
import {ArcticleTags} from 'src/entities/arcticletags.entity';
// import {ArcticleRepository} from 'src/repositories/arcticle.repository';
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

    async getHello() {
  
      // const response = await this.http.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs').toPromise();
      // return await response.data;
  
      return  await firstValueFrom(this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`))
      .then(response => {
        response.data.hits.forEach(arcticle => {
          this.registerArcticle(arcticle);
          // Logger.log(arcticle)
        });
        return response.data.hits;
      })
      .catch(err => {}  );

    }

    async registerArcticle(incomingArcticle: any) {

        const newArcticle = new Arcticle();
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
          Logger.log('Ingreso Exitoso: ' + newArcticle.id);
          await this.registerTags(incomingArcticle._tags, newArcticle.id);
        })
        .catch(err => {
          Logger.log(err+ ' Error al ingresar: ' + newArcticle.external_id);
        });
        
    }


    async registerTags(incomingTags: any, Arcticle_id: number) {

      await incomingTags.forEach(async  tag => {
        await this.tagsRepository.findOne({where: {name: tag}}).then(async findedtag  => {
          Logger.log('Tag encontrado: ' + JSON.stringify(findedtag)); 
          if(!findedtag){
            const newTag = new Tags();
            newTag.name = tag;
            newTag.created_date = DateTime.now().toISO();
            await this.tagsRepository.save(newTag)
            .then(async res => {
              Logger.log('Ingreso Exitoso de tag: ' + newTag.id);
              await this.registerArcticleTags(newTag.id, Arcticle_id);
            })
            .catch(err => {
              Logger.error(err+ ' Error al ingresar tag: ' + newTag.name);
            });
          }else{
            await this.registerArcticleTags(findedtag.id, Arcticle_id);
          }
        }).catch(err => {
          Logger.error(err+ ' Error al buscar ');
        } );
      });
      
    }

    async registerArcticleTags(tag_id: number, arcticle_id: number) {

        const newArcticleTags = new ArcticleTags();
        newArcticleTags.arcticle_id = arcticle_id;
        newArcticleTags.tag_id = tag_id;
        await this.arcticleTagsRepository.save(newArcticleTags).then(res => {
          Logger.log('Ingreso Exitoso de ArcticleTags: ' + newArcticleTags.id);
        }).catch(err => {
          Logger.error(err+ ' Error al ingresar ArcticleTags: ' + newArcticleTags.id);
        } );
    }

}
