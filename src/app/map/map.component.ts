import { Component, OnInit } from '@angular/core';


import * as L from 'leaflet';
import { CornService } from '../services/corn.service';
import { Corn } from '../class/corn';
import { Sunflower } from '../class/sunflower';
import { SunflowerService } from '../services/sunflower.service';
import { Cereals } from '../class/cereals';
import { Barley } from '../class/barley';
import { BarleyService } from '../services/barley.service';
import { Rapeseed } from '../class/rapeseed';
import { RapeseedService } from '../services/rapeseed.service';
import { Wheat } from '../class/wheat';
import { WheatService } from '../services/wheat.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  corn: Corn[];
  serviceCorn: CornService;

  sunflower: Sunflower[];
  serviceSunflower: SunflowerService;

  barley: Barley[];
  serviceBarley: BarleyService;

  rapeseed: Rapeseed[];
  serviceRapeseed: RapeseedService;

  wheat: Wheat[];
  serviceWheat: WheatService;

  grosfichier: Cereals[];

  bool1: boolean;
  bool2: boolean;
  bool3: boolean;
  bool4: boolean;
  bool5: boolean;


  constructor(wheatService: WheatService, rapeseedService: RapeseedService, cornService: CornService, sunflowerService: SunflowerService, barleyService: BarleyService) {
    this.corn = [];
    this.serviceCorn = cornService;

    this.sunflower = [];
    this.serviceSunflower = sunflowerService;

    this.barley = [];
    this.serviceBarley = barleyService;

    this.rapeseed = [];
    this.serviceRapeseed = rapeseedService;

    this.wheat = [];
    this.serviceWheat = wheatService;

    this.grosfichier = [];
  }

  // Fonction d'initialisation du composant.
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.serviceCorn.getAll().subscribe(
      (tabOfCorn: Corn[]) => {
        this.corn = tabOfCorn;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.corn;
        this.grosfichier = this.grosfichier.concat(tmp);
        console.log("CORN" + this.grosfichier)
        this.bool1 = true;
        this.generateMap(this.grosfichier);
      }
    );

    this.serviceBarley.getAll().subscribe(
      (tabOfBarley: Barley[]) => {
        this.barley = tabOfBarley;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.barley;
        this.grosfichier = this.grosfichier.concat(tmp);
        console.log("BARLEY" + this.grosfichier)
        this.bool2 = true;
        this.generateMap(this.grosfichier);
      }
    );

    this.serviceSunflower.getAll().subscribe(
      (tabOfSunflower: Sunflower[]) => {
        this.sunflower = tabOfSunflower;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.sunflower;
        this.grosfichier = this.grosfichier.concat(tmp);
        console.log("sunflower" + this.grosfichier);
        this.bool3 = true;
        this.generateMap(this.grosfichier);
      }
    );

    this.serviceRapeseed.getAll().subscribe(
      (tabOfRapeseed: Rapeseed[]) => {
        this.rapeseed = tabOfRapeseed;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.rapeseed;
        this.grosfichier = this.grosfichier.concat(tmp);
        console.log("Rapeseed" + this.grosfichier);
        this.bool4 = true;
        this.generateMap(this.grosfichier);
      }
    );

    this.serviceWheat.getAll().subscribe(
      (tabOfWheat: Wheat[]) => {
        this.wheat = tabOfWheat;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.wheat;
        this.grosfichier = this.grosfichier.concat(tmp);
        console.log("WHEAT" + this.grosfichier);
        this.bool5 = true;
        this.generateMap(this.grosfichier);
      }
    );
  }

  public generateMap(param) {
    if (this.bool1 && this.bool2 && this.bool3 && this.bool4 && this.bool5) {
      const myfrugalmap = L.map('frugalmap').setView([47.6311634, 3.0599573], 1);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Frugal Map'
      }).addTo(myfrugalmap);

      const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      });
      param.forEach(podotactile => {
        L.marker([podotactile.coordinates.latitude, podotactile.coordinates.longitude], { icon: myIcon }).addTo(myfrugalmap);
      });

    }
  }
}

