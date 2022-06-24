import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpreadsheetService {
  private url = '/.netlify/functions/google-spreadsheet-fn'
  rows: Observable<any>;

  constructor(private http: HttpClient) { }

  getRows() {
    return this.rows ? this.rows : this.rows = this.http.get(this.url);
  }
}
