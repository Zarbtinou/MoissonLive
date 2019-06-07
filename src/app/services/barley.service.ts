import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Barley } from '../class/barley';
import { Cereals } from '../class/cereals';

@Injectable({
  providedIn: 'root'
})
export class BarleyService {
  private client:HttpClient;

  constructor(http:HttpClient) {
    this.client = http;
  }

  public getAll():Observable<Barley[]>{

    let obs:Observable<any> = this.client.get("https://api.capgrain.com/barley-observations");

    let treatment = (data:Barley[]) => {
      return data['hydra:member'] as Barley[];
    };

    return obs.pipe( map(treatment) );
  }

  public addBarley(param_form): Observable<Cereals> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this.client.post<Cereals>("https://api.capgrain.com/barley-observations", param_form, options);
  }
}
