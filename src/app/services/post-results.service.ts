import { Injectable } from '@angular/core';
import { Cereals } from '../class/cereals';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostResultsService {

  constructor(private httpClient: HttpClient) {}


  public createResult(param: Cereals): Observable<Cereals> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post<Cereals>('https://api.capgrain.com/barley-observations', param, options);
  }
  public postResult(param: Cereals): Observable<HttpResponse<Cereals>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<Cereals>('https://api.capgrain.com/barley-observations', param,
      {
        headers: httpHeaders,
        observe: 'response'
      }
    );
  }
}
