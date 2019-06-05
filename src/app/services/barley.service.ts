import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Barley } from '../class/barley';

@Injectable({
  providedIn: 'root'
})
export class BarleyService {

  private client:HttpClient;

  constructor( http:HttpClient) {
    this.client = http;
  }

  public getAll():Observable<Barley[]>{

    let obs:Observable<any> = this.client.get('assets/barley.json');

    let treatment = (data:any) => {
      return data['hydra:member'] as Barley[];
    };

    return obs.pipe( map(treatment) );
  }
}
