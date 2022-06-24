import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpreadsheetService {
  private url = '/.netlify/functions/google-spreadsheet-fn'
  rows: Observable<any>;
  rowsBySong: Observable<any>;

  constructor(private http: HttpClient) { }

  getRows() {
    return this.rows ? this.rows : this.rows = this.http.get(this.url);
  }

  getEntriesBySong() {
    return this.rowsBySong ? this.rowsBySong : this.rowsBySong = this.getRowsBySongHelper();
  }

  private getRowsBySongHelper() {
    return this.getRows().pipe(
      map(rows => {
        let rowsBySong = {}
        for(let row of rows) {
          let key = JSON.stringify({song: row['song'], artist: row['artist']})
          rowsBySong[key] ?  rowsBySong[key].push(row) : rowsBySong[key] = [row]
        }
        return rowsBySong
      })
    )
  }
}
