import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private _http: HttpClient) { }


  dailyForecast() {
    return this._http.get("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a0682121a87094e4dc734279be57687c")
      .pipe(map((result: any) => result));
  }
}
