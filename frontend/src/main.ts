import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import { provideHttpClient } from '@angular/common/http';

/**
 * Bootstrap the Angular application with HTTP client support.
 * This is the entry point for the Wall of Regret frontend application.
 */
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));