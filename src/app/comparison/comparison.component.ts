import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  title = 'Comparaison des rendements au niveau global';
   type = 'PieChart';
   data = [
      ['Mais', 20.0],
      ['Orge', 20.0],
      ['Tournesol', 20.0],
      ['Blé', 20.0],
      ['Colza', 20.0]
   ];
   columnNames = ['Browser', 'Percentage'];
   options = {    
   };
   width = 800;
   height = 750;
  

  constructor() { }

  ngOnInit() {
    
      
  }

}
