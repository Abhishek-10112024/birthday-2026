import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'constellation',
    loadComponent: () => import('./pages/constellation/constellation.component').then(m => m.ConstellationComponent),
    canActivate: [authGuard]
  },
  {
    path: 'final-message',
    loadComponent: () => import('./pages/final-message/final-message.component').then(m => m.FinalMessageComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
