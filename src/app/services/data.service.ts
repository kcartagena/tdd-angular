import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getHomes() {
    return this.httpClient.get<any>('assets/homes.json');
  }

  bookHome$() {
    return this.httpClient.post(
      'https://run.mocky.io/v3/4cde3daf-8d6a-4904-b28c-99e9b1b8d81a',
      {}
    );
  }
}
