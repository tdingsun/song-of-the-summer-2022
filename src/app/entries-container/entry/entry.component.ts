import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    let songObject = JSON.parse(this.key);
    this.songName = songObject.song;
    this.artistName = songObject.artist;
    this.link = this.reviews[0]['link'];
    console.log(this.reviews);
  }

}
