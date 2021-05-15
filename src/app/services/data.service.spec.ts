import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';
import { of } from 'rxjs';

describe('DataService', () => {
  let httpClient: HttpClient;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
  });

  it('should return the list of homes', () => {
    httpClient = TestBed.inject(HttpClient);
    const mockHomes = [
      {
        title: 'Home 1',
        image:
          'https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_1280.jpg',
        location: 'New York',
      },
      {
        title: 'Home 2',
        image:
          'https://cdn.pixabay.com/photo/2019/03/01/18/52/house-4028391_1280.jpg',
        location: 'South Carolina',
      },
      {
        title: 'Home 3',
        image:
          'https://cdn.pixabay.com/photo/2014/07/31/00/30/vw-beetle-405876_1280.jpg',
        location: 'California',
      },
    ];
    spyOn(httpClient, 'get').and.returnValue(of(mockHomes));
    const spy = jasmine.createSpy('spy');
    service.getHomes().subscribe(spy);

    expect(spy).toHaveBeenCalledWith(mockHomes);

    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json')
  });
});
