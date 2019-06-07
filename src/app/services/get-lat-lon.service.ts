import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetLatLonService {
  private client: HttpClient;

  constructor(http: HttpClient) { this.client = http; }

  public getLatLon(param_commune, param_dep): Observable<any> {

    let obs: Observable<any> = this.client.get("https://geo.api.gouv.fr/communes?codePostal=" + param_dep + "&nom=" + param_commune + "&fields=centre&format=json&geometry=centre");
    let treatment = (data: any) => {
      console.log(data[0].centre.coordinates);
      return data[0].centre.coordinates;
    };

    return obs.pipe(map(treatment));
  }
}
