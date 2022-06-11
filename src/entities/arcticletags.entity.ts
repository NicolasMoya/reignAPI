import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Arcticle } from './arcticle.entity';
import { Tags } from './tags.entity';
@Entity({ name: 'arcticle_tags' })
export class ArcticleTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  arcticleId: number;


  @Column()
  tagsId: number;

  @ManyToOne(type => Arcticle, arcticle => arcticle.arctag)
  arcticle: Arcticle;

  @ManyToOne(type => Tags, tags => tags.tagarc)
  @JoinColumn({ name: 'tagsId' })
  tags: Tags;

}