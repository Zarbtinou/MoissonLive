import { Component, OnInit } from '@angular/core';
import { BarleyService } from '../services/barley.service';
import { CornService } from '../services/corn.service';
import { RapeseedService } from '../services/rapeseed.service';
import { SunflowerService } from '../services/sunflower.service';
import { WheatService } from '../services/wheat.service';
import { GetLatLonService } from '../services/get-lat-lon.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  public cultur: string;
  public latLon: string[];

  constructor(
    public barleyService: BarleyService,
    public cornService: CornService,
    public rapeseedService: RapeseedService,
    public sunflowerService: SunflowerService,
    public wheatService: WheatService,
    public latLonService: GetLatLonService)
    {
      this.latLon = [];
    }

  ngOnInit() { }

  onSubmit(value) {
    this.latLonService.getLatLon(value.place, value.zipCode).subscribe(
      (result:string[]) => {
        this.latLon=result;
        console.log("************************"+this.latLon);
      }
    );
    let result = {
      "specificWeight": value.specificWeight,
      "email": value.email,
      "phone": value.phone,
      "variety": value.variety,
      "yield": value.yield,
      "humidity": value.humidity,
      "yieldNotation": value.yieldNotation,
      "nitrogenQuantityUsed": value.nitrogenQuantityUsed,
      "nitrogenProductUsed": value.nitrogenProductUsed,
      "comment": value.comment,
      "cultivationMethod": value.cultivationMethod,
      "targetPrice": value.targetPrice,
      "place": value.place,
      "coordinates": {
        "latitude": this.latLon[0],
        "longitude": this.latLon[1]
      }
    }
    if (value.cultur == 'Orge') {
      this.barleyService.addBarley(result).subscribe();
    } else if (value.cultur == 'Ble') {
      this.wheatService.addWheat(result).subscribe();
    } else if (value.cultur == 'Colza') {
      this.rapeseedService.addRapeseed(result).subscribe();
    } else if (value.cultur == 'Tournesol') {
      this.sunflowerService.addSunflower(result).subscribe();
    } else if (value.cultur == 'Mais') {
      this.cornService.addCorn(result).subscribe();
    };
    console.log(result);
  }

}


