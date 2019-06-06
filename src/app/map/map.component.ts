import { Component, OnInit } from '@angular/core';


import * as L from 'leaflet';
import { CornService } from '../services/corn.service';
import { Corn } from '../class/corn';
import { Sunflower } from '../class/sunflower';
import { SunflowerService } from '../services/sunflower.service';
import { Cereals } from '../class/cereals';

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

  grosfichier: Cereals[];


  constructor(cornService: CornService, sunflowerService: SunflowerService) {
    this.corn = [];
    this.serviceCorn = cornService;

    this.sunflower = [];
    this.serviceSunflower = sunflowerService;

    this.grosfichier = [];
  }

  // Fonction d'initialisation du composant.
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.serviceCorn.getAll().subscribe(
      (tabOfCorn: Corn[]) => {
        this.corn = tabOfCorn;
        let tmp : Cereals[] = [];
        tmp = <Cereals[]> this.corn;
        this.grosfichier = this.grosfichier.concat(tmp);
      }
    );

    this.serviceSunflower.getAll().subscribe(
      (tabOfSunflower: Sunflower[]) => {
        this.sunflower = tabOfSunflower;
        let tmp : Cereals[] = [];
        tmp = <Cereals[]> this.sunflower;
        this.grosfichier = this.grosfichier.concat(tmp);
        this.generateMap(this.grosfichier);
      }
    );
  }

  public generateMap(param) {
    const myfrugalmap = L.map('frugalmap').setView([50.6311634, 3.0599573], 12);

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

