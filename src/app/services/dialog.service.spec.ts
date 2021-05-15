import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  let dialogService = jasmine.createSpyObj('DialogService', ['open']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DialogService, useValue: dialogService },
      ],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
