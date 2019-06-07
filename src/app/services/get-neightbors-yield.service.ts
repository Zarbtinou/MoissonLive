import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetNeightborsYieldService {
  private client:HttpClient;

  constructor(http:HttpClient) {
    this.client = http;
  }

  public getYield(param_lat,param_long, param_radius, param_cereal):Observable<any[]>{

    let obs:Observable<any> = this.client.get(
      "https://api.capgrain.com/"+param_cereal+"-observations?coordinates%5Bwithin_center%5D=%5B"+param_lat+"%2C"+param_long+"%2C"+param_radius+"%5D");

    let treatment = (data:[]) => {

      //console.log("*****"+data['hydra:member'][0].yield);
      return data['hydra:member'];
    };

    return obs.pipe( map(treatment) );
  }
}


// Request model for get all yield
// https://api.capgrain.com/barley-observations?coordinates%5Bwithin_center%5D=%5B40.7%2C-73%2C10%5D

