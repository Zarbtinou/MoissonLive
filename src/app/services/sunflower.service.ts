import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sunflower } from '../class/sunflower' ;


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
}