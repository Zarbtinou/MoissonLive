import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Corn } from '../class/corn';
import { Cereals } from '../class/cereals';


@Injectable({
  providedIn: 'root'
})

export class CornService {
  private client:HttpClient;

  constructor( http:HttpClient ) {
    this.client = http;
   }

   public getAll():Observable<Corn[]>{

    let obs:Observable<any> = this.client.get("https://api.capgrain.com/corn-observations");
    let treatment = (data:any) => {
      return data['hydra:member'] as Corn[];
    };

    return obs.pipe(map(treatment));
   }

   public addCorn(param_form): Observable<Cereals> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this.client.post<Cereals>("https://api.capgrain.com/corn-observations", param_form);
  }
}
