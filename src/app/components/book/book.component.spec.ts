declare var require: any;
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData: any;
  let dataService = jasmine.createSpyObj('DataService', ['bookHome$']);
  let dialogService = jasmine.createSpyObj('DialogService', ['close']);
  let notificationService: jasmine.SpyObj<MatSnackBar>;

  const el = (selector: any) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [BookComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) },
        { provide: DataService, useValue: dataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.inject(MAT_DIALOG_DATA);
    dataService = TestBed.inject(DataService);
    dialogService = TestBed.inject(MatDialogRef);
    notificationService = TestBed.get(MatSnackBar);
    component = fixture.componentInstance;
    const mockHomes = require('../../../assets/homes.json');
    dialogData.home = mockHomes[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    expect(el('[data-test="title"]').textContent).toContain('Book Home 1');
  });

  it('should show price', () => {
    expect(el('[data-test="price"]').textContent).toContain(
      'Price: $395 /night'
    );
  });

  it('should show check-in', () => {
    expect(el('[data-test="check-in"]')).toBeTruthy();
  });

  it('should show check-out', () => {
    expect(el('[data-test="check-out"]')).toBeTruthy();
  });

  it('should show total', () => {
    // user enters check in date: 12/20/21
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/21';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out date: 12/23/21
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/21';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // assert that the total shows 3x395=1185
    expect(el('[data-test="total"]').textContent).toContain('Total: $1185');
  });
  it('should show nothing if there is no valid total', () => {
    // user enters check in date: 12/20/21
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out date: 12/23/21
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // assert that the total shows 3x395=1185
    expect(el('[data-test="total"]').textContent).toEqual('Total:');
  });

  it('should show book home after clicking book button', () => {
    dataService.bookHome$.and.returnValue(of(null));

    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/21';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/21';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    el('[data-test="book-btn"] button').click();

    expect(dataService.bookHome$).toHaveBeenCalled();
  });

  it('should close the dialog and show notifications', () => {
    dataService.bookHome$.and.returnValue(of(null));

    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/21';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/21';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    el('[data-test="book-btn"] button').click();

    expect(dialogService.close).toHaveBeenCalled();
    expect(notificationService.open).toHaveBeenCalled();
  });
});
