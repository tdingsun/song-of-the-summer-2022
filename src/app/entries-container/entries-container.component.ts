import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
  songList = [
    "song one",
    "song two"
  ]

 
  responses$: Observable<any>
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
