import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from "class-transformer";
import { ArcticleTags } from './arcticletags.entity';
import { Tags } from './tags.entity';


@Entity({ name: 'arcticle' })
export class Arcticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  comment_text: string;

  @Column()
  author: string;

  @Column()
  creation_date: string;

  @Column()
  origin_date: string;

  @Column()
  external_id: number;

  // join columns

  @Column()
  @Exclude()
  is_public: boolean;

  @OneToMany(type => ArcticleTags, arcticleTags => arcticleTags.arcticle)
  arctag: ArcticleTags[];



}
