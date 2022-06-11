import { Controller, Get, Logger } from '@nestjs/common';
import { DataService } from 'src/services/data/data.service';
import config from '../config';
import { Cron } from "@nestjs/schedule";

@Controller('cronjobs')
export class CronjobsController {

    constructor(private readonly dataService: DataService) {}

    // cron every hour
    @Cron('0 * * * *')
    @Get()
    insertData(): any {
      // Save data fron URL
      return this.dataService.addData(config.API_URL);
    }

}
