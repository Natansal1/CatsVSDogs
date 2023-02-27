import { Injectable } from '@nestjs/common';
import { CatsEntity } from './cats.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsEntity)
    private readonly catsRepository: Repository<CatsEntity>,
  ) {}

  async addCat(name: string) {
    const { cat_id } = await this.catsRepository.save({ cat_name: name });
    return {
      message: `${name} has been added successfully to the cats DB`,
      cat_id,
    };
  }

  async getCat(cat_id: number) {
    const cat = await this.catsRepository.findOneBy({ cat_id });
    return cat;
  }

  async getCats() {
    const cats = await this.catsRepository.findBy({ cat_souls: MoreThan(0) });
    return cats;
  }

  async getCatsLength() {
    const length = await this.catsRepository.count();
    return { length };
  }

  async removeSoul(cat_id: number) {
    let cat = await this.catsRepository.findOneBy({ cat_id });
    cat.cat_souls--;
    cat = await this.catsRepository.save(cat);
    return cat;
  }

  async getRandomCat() {
    const randomCat = await this.catsRepository
      .createQueryBuilder()
      .select()
      .where({ cat_souls: MoreThan(0) })
      .orderBy('RAND()')
      .take(1)
      .getOne();

    return randomCat;
  }
}
