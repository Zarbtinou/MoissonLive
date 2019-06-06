import { Component, OnInit } from '@angular/core';

import $ from '../../../node_modules/jquery';
import * as L from 'leaflet';
import { CornService } from '../services/corn.service';
import { Corn } from '../class/corn';
import { Sunflower } from '../class/sunflower';
import { SunflowerService } from '../services/sunflower.service';
import { Cereals } from '../class/cereals';
import { Barley } from '../class/barley';
import { BarleyService } from '../services/barley.service';

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

  grosfichier: Cereals[];


  constructor(cornService: CornService, sunflowerService: SunflowerService, barleyService: BarleyService) {
    this.corn = [];
    this.serviceCorn = cornService;

    this.sunflower = [];
    this.serviceSunflower = sunflowerService;

    this.barley = [];
    this.serviceBarley = barleyService;

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
        console.log("CORN"+this.grosfichier)
      }
    );

    this.serviceBarley.getAll().subscribe(
      (tabOfBarley: Barley[]) => {
        this.barley = tabOfBarley;
        let tmp : Cereals[] = [];
        tmp = <Cereals[]> this.barley;
        this.grosfichier = this.grosfichier.concat(tmp);
        console.log("BARLEY"+this.grosfichier)
      }
    );

    this.serviceSunflower.getAll().subscribe(
      (tabOfSunflower: Sunflower[]) => {
        this.sunflower = tabOfSunflower;
        let tmp : Cereals[] = [];
        tmp = <Cereals[]> this.sunflower;
        this.grosfichier = this.grosfichier.concat(tmp);
        console.log("sunflower"+this.grosfichier);
        this.generateMap(this.grosfichier);
      }

    );


  }



  public generateMap(param) {
    const map = L.map('frugalmap').setView([47.6311634, 3.0599573], 1);
    $('#locate-position').on('click', function(){
      map.locate({setView: true, maxZoom: 15});
    });
    
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .on('click', function(){
              confirm("are you sure?");
            });
            //.bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(map);
    }
    
    map.on('locationfound', onLocationFound);
    
    function onLocationError(e) {
        alert(e.message);
    }
    map.on('locationerror', onLocationError);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(map);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    param.forEach(podotactile => {
      L.marker([podotactile.coordinates.latitude, podotactile.coordinates.longitude], { icon: myIcon }).addTo(map);
    });

  }

  
}

