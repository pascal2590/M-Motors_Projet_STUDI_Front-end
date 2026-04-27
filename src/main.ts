import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { App } from './app/app';
import { routes } from './app/app.routes';

import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(App, {
  providers: [

    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ]
})
  .catch(err => console.error(err));
