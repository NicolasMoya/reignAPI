import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CronjobsController } from './controllers/cronjobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { DataService } from 'src/services/data/data.service';
import { Arcticle } from 'src/entities/arcticle.entity';
import { Tags } from 'src/entities/tags.entity';
import { ArcticleTags } from 'src/entities/arcticletags.entity';
import { ArcticlesController } from 'src/controllers/arcticles.controller';
import { ArcticlesService } from 'src/services/arcticles/arcticles.service';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.DB_NAME,
      username: config.DB_USER,
      password: config.DB_PASS,
      entities: [Arcticle, Tags, ArcticleTags],
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([
      Arcticle,
      Tags,
      ArcticleTags
    ]),
    ScheduleModule.forRoot(),],
  controllers: [AppController, CronjobsController, ArcticlesController],
  providers: [AppService, DataService, ArcticlesService],
})
export class AppModule {}
