import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CatsService } from 'src/cats/cats.service';

@Controller('dogs')
export class DogsController {
  constructor(
    private readonly DogsService: DogsService,
    private readonly CatsService: CatsService,
  ) {}
  @Post('/')
  async addDog(@Body() { name }: { name: string }) {
    return await this.DogsService.addDog(name);
  }

  @Get('/')
  async getDogs() {
    return await this.DogsService.getDogs();
  }

  @Get('/:dogId')
  async getDog(@Param() { dogId }: { dogId: string }) {
    return await this.DogsService.getDog(parseInt(dogId));
  }

  @Delete('/:dogId')
  async deleteDog(@Param() { dogId }: { dogId: string }) {
    return await this.DogsService.removeDog(parseInt(dogId));
  }

  @Get('/:dogId/chase')
  async chaseCat(@Param() { dogId }: { dogId: string }) {
    return await this.DogsService.startChase(parseInt(dogId));
  }
}
