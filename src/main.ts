import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { DatePipe } from '@angular/common';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideHttpClient(),DatePipe
  ]
}).catch(err => console.error(err))