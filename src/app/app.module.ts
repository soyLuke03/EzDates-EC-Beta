import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { TermConditionsModule } from './term-conditions/term-conditions.module';
import { GamesModule } from './games/games.module';
import { InterestsModule } from './interests/interests.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GamesModule,
    InterestsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    TermConditionsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgDynamicBreadcrumbModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
