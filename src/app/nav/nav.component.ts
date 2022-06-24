import { Component, OnInit } from '@angular/core';
import { SpreadsheetService } from '../services/spreadsheet.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  keys;
  constructor(
    private spreadsheetService: SpreadsheetService
  ) { }

  ngOnInit(): void {
    this.spreadsheetService.getEntriesBySong().subscribe((rows) => {
      this.keys = Object.keys(rows);
    })
  }

  onClick(event) {
    console.log("clicked");
  }

}
