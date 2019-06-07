import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from'rxjs/operators';
import { Observable } from 'rxjs';
import { Graph } from './graph';


@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private client:HttpClient;
  constructor(http: HttpClient) {
    this.client = http;
   }


  //public dailyForecast():Observable<Graph[]> {
    //let obs:Observable<any> = this.client.get('');

    //let treatment = (data:any) => {
     // return data['hydra:member'] as Graph;
    };

    //return obs.pipe( map(treatment) );
    


