import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'arcticle_tags' })
export class ArcticleTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  arcticle_id: number;


  @Column()
  tag_id: number;

}