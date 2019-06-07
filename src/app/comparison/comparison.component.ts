import { Component, OnInit } from '@angular/core';
import { GetNeightborsYieldService } from '../services/get-neightbors-yield.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  serviceGetYield: GetNeightborsYieldService;
  tabOfYield: number[];
  notOk: boolean;
  cereal:string = "corn";
  param_lat: number = 48.4667;
  param_long: number = 1.0167;
  param_rad: number = 1;

  
   type = 'PieChart';
   title1 = "Répartition des rendements en orge d'hiver (en qtx)";
   
   data1 = [
      ['< 70', 16.3],
      ['70-79', 41.2],
      ['80-89', 24.0],
      ['90-99', 15.4],
      ['> 100', 3.0]
   ];
   data2 = [
    ['Inferieur à la moyenne', 33.7],
    ['Moyen', 41.5],
    ['Nettement inferieur à la moyenne', 8.6],
    ['Nettement superieur à la moyenne', 2.0],
    ['Superieur à la moyenne', 14.1]
 ];

 data3 = [
  ['< 30', 26.1],
  ['30-35', 35.7],
  ['35-40', 22.6],
  ['40-45', 13.0],
  ['> 145', 2.6]
];

data4 = [
  ['Inferieur à la moyenne', 41.5],
  ['Moyen', 28.0],
  ['Nettement inferieur à la moyenne', 22.0],
  ['Nettement superieur à la moyenne', 1.7],
  ['Superieur à la moyenne', 6.8]
];

 
   columnNames1 = ['Browser', 'Percentage'];
   options1 = {
   };
   width1 = 800;
   height1 = 600;


  constructor(serviceYield: GetNeightborsYieldService) {
    this.serviceGetYield = serviceYield;
    this.tabOfYield = [];
    this.notOk = false;

  }

  ngOnInit() {
    this.start(this.param_lat, this.param_long, this.param_rad, this.cereal);
  }

  start(a, b, c, d) {
    this.serviceGetYield.getYield(a, b, c, d).subscribe(
      (result: any[]) => {
        console.log(result.length);
        if (result.length < 5) {
          this.param_rad += 10;
          this.start(this.param_lat, this.param_long, this.param_rad, this.cereal);
        } else {
          for (let i: number = 0; i < result.length; i++) {
            this.tabOfYield[i] = parseInt(result[i].yield);
          }
          console.log(this.tabOfYield);
        }
      }
    );

  }

}

