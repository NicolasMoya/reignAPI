import { Controller, Get } from '@nestjs/common';
import { DataService } from 'src/services/data/data.service';

@Controller('cronjobs')
export class CronjobsController {

    constructor(private readonly dataService: DataService) {}

    @Get()
    getHello(): any {
      return this.dataService.getHello();
    }

}
