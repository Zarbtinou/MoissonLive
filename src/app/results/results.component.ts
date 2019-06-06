import { Component, OnInit } from '@angular/core';
import { Cereals } from '../class/cereals';
import { PostResultsService } from '../services/post-results.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  dataSaved = false;
  recolteForm: FormGroup;
  allResults$: Observable<Cereals[]>




  // postService: PostResultsService

  constructor(private formBuilder: FormBuilder, private postService: PostResultsService) {

  }
  ngOnInit() {
    this.recolteForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      yield: ['', [Validators.required]],
      yieldNotation: ['', [Validators.required]],
      nitrogenQuantityUsed: ['', [Validators.required]],
      nitrogenProductUsed: ['', [Validators.required]],
      cultivationMethod: ['', [Validators.required]],
      place: ['', [Validators.required]],
      coordinates: ['', [Validators.required]]
    });
    this.resultSaved();
  }

  onFormSubmit() {
    this.dataSaved = false;
    let result = this.recolteForm.value;
    this.createPost(result);
  }

  createPost(param: Cereals) {
    this.postService.saveResult(param).subscribe(
      param => {
        console.log(param);
        this.dataSaved = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  get email() {
    return this.recolteForm.get('email');
  }
  get yield() {
    return this.recolteForm.get('yiel');
  }

  resultSaved() {
    // let result: Cereals = {
    //   specificWeight: 72,
    //   email: "julienauvray@gmail.com",
    //   phone: "+33600000000",
    //   variety: "super barley",
    //   yield: 83.2,
    //   humidity: 99.5,
    //   yieldNotation: 5,
    //   nitrogenQuantityUsed: 5.2,
    //   nitrogenProductUsed: "Solution for all ur probs",
    //   comment: "This is a short commentary.",
    //   cultivationMethod: "conventional",
    //   targetPrice: 120.5,
    //   place: "Madison square park",
    //   coordinates: {
    //     latitude: 48.3667,
    //     longitude: 1.0130
    //   }
    // };
    // console.log(result);
    // this.postService.saveResult(result).subscribe(res => {
    //   let tmp: Cereals = res;
    //   console.log(tmp.email);
    // },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       //A client-side or network error occurred.
    //       console.log('An error occurred:', err.error.message);
    //     } else {
    //       //Backend returns unsuccessful response codes such as 404, 500 etc.
    //       console.log('Backend returned status code: ', err.status);
    //       console.log('Response body:', err.error);
    //     }
    //   }
    // );
}
}
