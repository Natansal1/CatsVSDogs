import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dogs } from './dogs';
import { CatsModule } from 'src/cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsEntity } from './dogs.entity';
import { CatsEntity } from 'src/cats/cats.entity';
import { ChaseEntity } from './chase.entity';

@Module({
  imports: [CatsModule, TypeOrmModule.forFeature([DogsEntity, ChaseEntity])],
  controllers: [DogsController],
  providers: [DogsService, Dogs],
  exports: [DogsService],
})
export class DogsModule {}
