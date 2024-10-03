import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { AuthGuard } from './app/auth/auth.guard';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),DatePipe,
    AuthGuard,
    provideAnimations(), 
    provideToastr(),
  ]
}).catch(err => console.error(err))