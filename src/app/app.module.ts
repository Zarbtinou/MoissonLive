import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { ResultsComponent } from './results/results.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { FooterComponent } from './footer/footer.component';
import { GraphService } from './graph.service'
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    MapComponent,
    ResultsComponent,
    ComparisonComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
