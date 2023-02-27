import { CatsEntity } from 'src/cats/cats.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { DogsEntity } from './dogs.entity';

export enum CaughtFormat {
  SUCCESS = 'success',
  FAIL = 'fail',
}

@Entity()
export class ChaseEntity {
  @PrimaryGeneratedColumn()
  chase_id: number;

  @Column('enum', { nullable: false, enum: CaughtFormat })
  result: CaughtFormat;

  @ManyToOne(() => CatsEntity, (cat) => cat.cat_id)
  @JoinColumn({ name: 'cat_id' })
  cat: CatsEntity;

  @ManyToOne(() => DogsEntity, (dog) => dog.dog_id)
  @JoinColumn({ name: 'dog_id' })
  dog: DogsEntity;
}
