import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResultsComponent } from './results/results.component';
import { ComparisonComponent } from './comparison/comparison.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'LandingPage', pathMatch: 'full' },
  { path: 'LandingPage', component: LandingPageComponent },
  { path: 'Map', component: MapComponent },
  { path: 'NavBar', component: NavbarComponent },
  { path: 'Results', component: ResultsComponent },
  { path: 'Comparison', component: ComparisonComponent },
];

export { ROUTES };