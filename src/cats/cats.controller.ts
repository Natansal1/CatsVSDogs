import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

('myDomain/cats/1'); //GET request
@Controller('cats')
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Post('/')
  async addCat(@Body() { name }: { name: string }) {
    return await this.CatsService.addCat(name);
  }

  @Get('/')
  async getCats() {
    return await this.CatsService.getCats();
  }

  @Get('/:catId')
  async getCat(@Param() { catId }: { catId: string }) {
    return await this.CatsService.getCat(parseInt(catId));
  }
}
