import { Injectable } from '@angular/core';
import { Cereals } from '../class/cereals';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostResultsService {

  constructor(private httpClient: HttpClient) {
  }


  public saveResult(param: Cereals): Observable<Cereals> {
    return this.httpClient.post<Cereals>('https://api.capgrain.com/barley-observations', param,
      {
        observe: 'body',
        responseType: 'json'
      }
    );
  }
}
