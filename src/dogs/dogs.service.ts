import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DogsEntity } from './dogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CatsEntity } from 'src/cats/cats.entity';
import { CatsService } from 'src/cats/cats.service';
import { CaughtFormat, ChaseEntity } from './chase.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogsEntity)
    private readonly dogsRepository: Repository<DogsEntity>,
    @InjectRepository(ChaseEntity)
    private readonly chaseRepository: Repository<ChaseEntity>,
    private readonly catsService: CatsService,
  ) {}

  async addDog(name: string) {
    const { dog_id } = await this.dogsRepository.save({ dog_name: name });
    return {
      message: `${name} has been added successfully to the dogs DB`,
      dog_id,
    };
  }

  async getDog(dog_id: number) {
    const dog = await this.dogsRepository.findOneBy({ dog_id });
    return dog;
  }

  async getDogs() {
    const dogs = await this.dogsRepository.find();
    return dogs;
  }

  async removeDog(dog_id: number) {
    await this.dogsRepository.delete({ dog_id });
    return { message: 'Dog deleted successfully' };
  }

  async getDogsLength() {
    const length = await this.dogsRepository.count();
    return { length };
  }

  async addCatchCount(dog_id: number) {
    let dog = await this.dogsRepository.findOneBy({ dog_id });
    dog.catch_count++;
    dog = await this.dogsRepository.save(dog);
    return dog;
  }

  didCatch() {
    return Math.random() > 0.7;
  }

  async startChase(dog_id: number) {
    const cat = await this.catsService.getRandomCat();
    console.log(`Lets chase this cat: ${cat.cat_name}`);
    if (this.didCatch()) {
      const [newDog, newCat] = await Promise.all([
        this.addCatchCount(dog_id),
        this.catsService.removeSoul(cat.cat_id),
      ]);
      await this.chaseRepository.save({
        result: CaughtFormat.SUCCESS,
        cat: newCat,
        dog: newDog,
      });
      return newCat;
    } else {
      console.log('This cat is very lucky!');
      const dog = await this.dogsRepository.findOneBy({ dog_id });
      await this.chaseRepository.save({
        result: CaughtFormat.FAIL,
        cat: cat,
        dog: dog,
      });
      return { cat, message: 'sup bro? i failed' };
    }
  }
}
