import { Routes } from '@angular/router';
import { AllReportsComponent } from './features/reports/pages/all-reports/all-reports';

export const routes: Routes = [
  { path: '', component: AllReportsComponent },
  { path: '**', redirectTo: '' }
];
