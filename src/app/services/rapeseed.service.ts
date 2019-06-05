import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rapeseed } from '../class/rapeseed' ;


@Injectable({
  providedIn: 'root'
})

export class RapeseedService {
  private client:HttpClient;

  constructor( http:HttpClient ) {
    this.client = http;
   }

   public getAll():Observable<Rapeseed[]>{

    let obs:Observable<any> = this.client.get("https://api.capgrain.com/rapeseed-observations");
    let treatment = (data:any) => {
      return data['hydra:member'] as Rapeseed[];
    };

    return obs.pipe(map(treatment));
   }
}