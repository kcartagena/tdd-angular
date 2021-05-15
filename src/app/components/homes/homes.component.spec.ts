import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';

import { HomesComponent } from './homes.component';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService = jasmine.createSpyObj('DataService', ['getHomes']);
  let dialogService = jasmine.createSpyObj('DialogService', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomesComponent],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: DialogService, useValue: dialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
  });
  beforeEach(() => {
    dialogService = TestBed.inject(DialogService);
    dataService = TestBed.inject(DataService);
    dataService.getHomes.and.returnValue(
      of([
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
      ])
    );

    fixture.detectChanges();
  });

  it('should show homes', () => {
    expect(
      fixture.nativeElement.querySelectorAll('[data-test="home"]').length
    ).toBe(3);
  });
  it('should show home info', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="title"]').innerText).toEqual(
      'Home 1'
    );
    expect(home.querySelector('[data-test="location"]').innerText).toEqual(
      'New York'
    );
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });
  it('should show Book button', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="book-btn"]').innerText).toBeTruthy();
  });
  it('should use dialog service to open a dialog when clicking Book button', () => {
    const bookBtn = fixture.nativeElement.querySelector(
      '[data-test="home"] button'
    );

    bookBtn.click();

    expect(dialogService.open).toHaveBeenCalled();
  });
});
