import { Component, Input, OnInit } from '@angular/core';
import { headers } from '../../../services/spreadsheet.model'
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() review

  name = '';
  location = '';
  description = '';



  constructor() { }

  ngOnInit(): void {
    this.name = this.review[headers.NAME];
    this.location = this.review[headers.LOCATION];
    this.description = this.review[headers.DESCRIPTION];

  }

}
