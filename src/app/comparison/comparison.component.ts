import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';
import { Chart } from 'chart.js';
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

