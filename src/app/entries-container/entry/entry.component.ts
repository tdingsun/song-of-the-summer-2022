import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  @Input() song
  personList = [
    {
      name: "tiger",
      location: "philly",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus ligula. Curabitur sollicitudin porttitor neque ac posuere. Donec non cursus nulla. Sed imperdiet lectus nec porttitor aliquam. In nec nisl ut mauris tincidunt pellentesque. In ex orci, euismod ornare cursus vestibulum, ornare pulvinar lorem. Maecenas non turpis lobortis, luctus nunc sit amet, placerat nibh."
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
