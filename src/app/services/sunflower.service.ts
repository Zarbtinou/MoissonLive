import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sunflower } from '../class/sunflower' ;
import { Cereals } from '../class/cereals';


@Injectable({
  providedIn: 'root'
})

export class SunflowerService {
  private client:HttpClient;

  constructor( http:HttpClient ) {
    this.client = http;
   }

   public getAll():Observable<Sunflower[]>{

    let obs:Observable<any> = this.client.get("https://api.capgrain.com/sunflower-observations");
    let treatment = (data:any) => {
      return data['hydra:member'] as Sunflower[];
    };

    return obs.pipe(map(treatment));
   }

   public addSunflower(param_form): Observable<any> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this.client.post<any>("https://api.capgrain.com/sunflower-observations", param_form, options);
  }
}
