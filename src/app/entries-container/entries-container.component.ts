import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpreadsheetService } from '../services/spreadsheet.service';

const attributesMapping = {
    email: "Email Address",
    name: "What's your preferred name?",
    location: "Where do you live right now? (City and/or State and/or Country) (optional)",
    song: "Song",
    artist: "Artist",
    link: "Youtube or Soundcloud Link?",
    description: "What do you have to say about it? (Optional)"
}


@Component({
  selector: 'app-entries-container',
  templateUrl: './entries-container.component.html',
  styleUrls: ['./entries-container.component.scss']
})
export class EntriesContainerComponent implements OnInit {
  rows;
  keys;
 
  responses$: Observable<any>
  constructor(
    private spreadsheetService: SpreadsheetService
  ) { }

  ngOnInit(): void {
    this.spreadsheetService.getEntriesBySong().subscribe((rows) => {
      this.rows = rows
      this.keys = Object.keys(rows);
    })
  }

}
