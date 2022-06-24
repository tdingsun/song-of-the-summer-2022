import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() key
  songName: string;
  artistName: string;
  anchorId: string;
  constructor() { }

  ngOnInit(): void {
    let keyObject = JSON.parse(this.key);
    this.songName = keyObject.song;
    this.artistName = keyObject.artist;
    this.anchorId = ('#' + this.songName + '-' + this.artistName).replace(' ', '-');
  }

}
