import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ChaseEntity } from './chase.entity';

@Entity()
export class DogsEntity {
  @PrimaryGeneratedColumn()
  dog_id: number;

  @Column('text', { nullable: false })
  dog_name: string;

  @Column('int', { nullable: false, default: 0 })
  catch_count: number;

  @OneToMany(() => ChaseEntity, (chase) => chase.dog, { eager: true })
  chases: ChaseEntity[];
}
