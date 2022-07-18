import { Component, Input, OnInit } from '@angular/core';
import { headers } from '../../services/spreadsheet.model'
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  @Input() key
  @Input() reviews
  songName: string;
  artistName: string;
  link: string;
  anchorId: string;
  useSparseLayout: boolean;
  constructor() { }

  ngOnInit(): void {
    let songObject = JSON.parse(this.key);
    this.songName = songObject.song;
    this.artistName = songObject.artist;
    this.link = this.reviews[0][headers.LINK];
    this.anchorId = (this.songName + '-' + this.artistName).replace(' ', '-');
    if(this.reviews.length <= 2) {
      this.useSparseLayout = true;
    }
  }

}
