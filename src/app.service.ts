import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { interval, firstValueFrom,lastValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  constructor(private http: HttpService) {}




  async getHello() {

    // const response = await this.http.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs').toPromise();
    // return await response.data;

    const resp = await firstValueFrom(this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`));

    return resp.data;

  }
}
