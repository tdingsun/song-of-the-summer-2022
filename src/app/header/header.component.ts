import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  playlistLink = "https://www.youtube.com/playlist?list=PLsW-ZGvYnUZc1vfa84Fm1yJ2_lP4LXp_U";
  songOfTheSummer = "SONG OF THE SUMMER — 2022"
  playlist = "☆♪☆♪☆♫☆PLAYLIST☆♫☆♪☆♪☆"
  content = this.songOfTheSummer
  constructor() { }

  ngOnInit(): void {
  }

  onMouseEnter() {
    this.content = this.playlist
  }

  onMouseLeave() {
    this.content = this.songOfTheSummer
  }


}
