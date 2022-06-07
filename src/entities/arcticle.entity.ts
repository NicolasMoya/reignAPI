import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  is_public: boolean;

}
