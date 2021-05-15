import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  checkIn: any;
  checkOut: any;
  disabled = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    public dialogRef: MatDialogRef<DialogService>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  calculateTotal(checkIn: any, checkOut: any) {
    const checkInDate = moment(checkIn, 'MM-DD-YY');
    const checkOutDate = moment(checkOut, 'MM-DD-YY');
    const nights = checkOutDate.diff(checkInDate, 'days');

    const total = nights * this.data.home.price;

    if (total > 0) {
      this.disabled = false;
      console.log(this.disabled)
      return ' $' + total;
    }
    return '';
  }

  bookHome() {
    this.dataService.bookHome$().subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Your stay has been booked. Thank you!', 'Close', {
        duration: 3000,
      });
    });
  }
}
