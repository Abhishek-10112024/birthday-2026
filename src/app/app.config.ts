import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch()),
    // @ts-ignore - provideAnimations() deprecation is a known issue in Angular 21.1
    provideAnimations()
  ]
};
