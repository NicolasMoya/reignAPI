import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ArcticleTags } from './arcticletags.entity';


@Entity({ name: 'tags' })
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column()
  created_date: string;

  // join columns
  @OneToMany(type => ArcticleTags, arcticleTags => arcticleTags.tags)
  tagarc: ArcticleTags[];


}