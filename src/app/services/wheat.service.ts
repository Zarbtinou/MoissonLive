import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Wheat } from '../class/wheat' ;
import { Cereals } from '../class/cereals';


@Injectable({
  providedIn: 'root'
})

export class WheatService {
  private client:HttpClient;

  constructor( http:HttpClient ) {
    this.client = http;
   }

   public getAll():Observable<Wheat[]>{

    let obs:Observable<any> = this.client.get("https://api.capgrain.com/wheat-observations");
    let treatment = (data:any) => {
      return data['hydra:member'] as Wheat[];

    };

    return obs.pipe(map(treatment));
   }

   public addWheat(param_form): Observable<Cereals> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this.client.post<Cereals>("https://api.capgrain.com/wheat-observations", param_form, options);
  }
}
