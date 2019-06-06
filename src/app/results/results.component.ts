import { Component, OnInit } from '@angular/core';
import { Cereals } from '../class/cereals';
import { PostResultsService } from '../services/post-results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  private result = {
    specificWeight: 76,
    email: "julienauvray@gmail.com",
    phone: "+33600000000",
    variety: "SuperCOdeur",
    yield: 83.2,
    humidity: 99.5,
    yieldNotation: 5,
    nitrogenQuantityUsed: 5.2,
    nitrogenProductUsed: "Solution for all ur probs",
    comment: "This is a short commentary.",
    cultivationMethod: "conventional",
    targetPrice: 120.5,
    place: "Madison square park",
    coordinates: {
      latitude: 48.4667,
      longitude: 1.0167
    }
  }

  postService: PostResultsService

  constructor(postResultService: PostResultsService) {
    this.postService = postResultService;
   }

  ngOnInit() {
    //this.postService.saveResult(this.result).subscribe(
  //    result => {
  //      console.log(result);
  //    }
  //  );
  }
}
