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

  map: any;


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
  }


  ngOnInit() {

    this.serviceCorn.getAll().subscribe(
      (tabOfCorn: Corn[]) => {
        this.corn = tabOfCorn;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.corn;
        this.generateMap(tmp);
      }
    );

    this.serviceBarley.getAll().subscribe(
      (tabOfBarley: Barley[]) => {
        this.barley = tabOfBarley;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.barley;
        this.generateMap(tmp);
      }
    );

    this.serviceSunflower.getAll().subscribe(
      (tabOfSunflower: Sunflower[]) => {
        this.sunflower = tabOfSunflower;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.sunflower;
        this.generateMap(tmp);
      }
    );

    this.serviceRapeseed.getAll().subscribe(
      (tabOfRapeseed: Rapeseed[]) => {
        this.rapeseed = tabOfRapeseed;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.rapeseed;
        this.generateMap(tmp);
      }
    );

    this.serviceWheat.getAll().subscribe(
      (tabOfWheat: Wheat[]) => {
        this.wheat = tabOfWheat;
        let tmp: Cereals[] = [];
        tmp = <Cereals[]>this.wheat;
        this.generateMap(tmp);
      }
    );
    this.map = L.map('frugalmap').setView([47.6311634, 3.0599573], 1);
  }




  public generateMap(param) {
    console.log(param);

//Configuration carte

    $('#locate-position').on('click', function () {
      this.map.locate({ setView: true, maxZoom: 15 });
    });

    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      L.marker(e.latlng).addTo(this.map)
        .on('click', function () {
          confirm("are you sure?");
        });
//.bindPopup("You are within " + radius + " meters from this point").openPopup();
      L.circle(e.latlng, radius).addTo(this.map);
    }

    this.map.on('locationfound', onLocationFound);

    function onLocationError(e) {
      alert(e.message);
    }
    this.map.on('locationerror', onLocationError);

// Fonds de carte
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Moisson Live'
    }).addTo(this.map);

// Configuration icone marqueur
    const myIconBarley = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    const myIconRapeSeed = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
    });
    const myIconSunflowers = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
    });
    const myIconCorn = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png'
    });
    const myIconWheat = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png'
    });


    for (let i = 0; i < param.length; i++) {
// Config popup ( a mettre dans la boucle )
      let text: string = param[i].variety+" / "+param[i].email;
      console.log(text);
// Ajout marqueur
      if (param[i]['@type'] == "BarleyObservation") {

        let test = L.marker([param[i].coordinates.latitude, param[i].coordinates.longitude], { icon: myIconBarley }).bindPopup(text).addTo(this.map);
      } else if (param[i]['@type'] == "CornObservation") {
        let test = L.marker([param[i].coordinates.latitude, param[i].coordinates.longitude], { icon: myIconCorn }).bindPopup(text).addTo(this.map);
      } else if (param[i]['@type'] == "SunflowerObservation") {
        let test = L.marker([param[i].coordinates.latitude, param[i].coordinates.longitude], { icon: myIconSunflowers }).bindPopup(text).addTo(this.map);
      } else if (param[i]['@type'] == "WheatObservation") {
        let test = L.marker([param[i].coordinates.latitude, param[i].coordinates.longitude], { icon: myIconWheat }).bindPopup(text).addTo(this.map);
      } else if (param[i]['@type'] == "RapeseedObservation") {
        let test = L.marker([param[i].coordinates.latitude, param[i].coordinates.longitude], { icon: myIconRapeSeed }).bindPopup(text).addTo(this.map);
      }
    }


  };


}





