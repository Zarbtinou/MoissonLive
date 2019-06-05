import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import { CornService } from '../corn.service';
import { Corn } from '../corn';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  corn: Corn[];
  service: CornService;

  constructor(cornService: CornService) {
    this.corn = [];
    this.service = cornService;
  }

  // Fonction d'initialisation du composant.
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.service.getAll().subscribe(
      (tabOfCorn: Corn[]) => {
        this.corn = tabOfCorn;
        this.generateMap();
      }
    );
  }

  public generateMap() {
    const myfrugalmap = L.map('frugalmap').setView([50.6311634, 3.0599573], 12);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    this.corn.forEach(podotactile => {
      console.log("************************************************");
      L.marker([podotactile.coordinates.latitude, podotactile.coordinates.longitude], { icon: myIcon }).addTo(myfrugalmap);
    });

  }
}
