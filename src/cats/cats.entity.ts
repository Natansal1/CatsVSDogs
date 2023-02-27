import { ChaseEntity } from 'src/dogs/chase.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class CatsEntity {
  @PrimaryGeneratedColumn()
  cat_id: number;

  @Column('varchar', { nullable: false })
  cat_name: string;

  @Column('int', { nullable: false, default: 9 })
  cat_souls: number;

  @OneToMany(() => ChaseEntity, (chase) => chase.cat, { eager: true })
  chases: ChaseEntity[];
}
