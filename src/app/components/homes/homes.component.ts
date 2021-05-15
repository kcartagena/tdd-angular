import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss'],
})
export class HomesComponent implements OnInit {
  homes$!: Observable<{ title: string; image: string; location: string }[]>;

  constructor(
    private dataService: DataService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.homes$ = this.dataService.getHomes();
  }

  openDialog(home: any) {
    this.dialogService.open(BookComponent, {
      width: '300px',
      data: { home },
    });
  }
}
