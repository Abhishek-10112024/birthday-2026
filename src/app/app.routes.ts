import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'constellation',
    loadComponent: () => import('./pages/constellation/constellation.component').then(m => m.ConstellationComponent)
  },
  {
    path: 'final-message',
    loadComponent: () => import('./pages/final-message/final-message.component').then(m => m.FinalMessageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
