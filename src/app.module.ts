import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    DogsModule,
    CatsModule,
    TypeOrmModule.forRoot({
      username: 'root',
      password: 'z10mz10m',
      type: 'mysql',
      database: 'catsVSdogs',
      port: 3306,
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
