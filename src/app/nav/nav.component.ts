import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  songList = [
    "song one",
    "song two"
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    console.log("clicked");
  }

}
