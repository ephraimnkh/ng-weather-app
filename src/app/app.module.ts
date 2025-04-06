import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './layout/loading-spinner/loading-spinner.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        LoadingSpinnerComponent,
        ErrorModalComponent,
        SettingsComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
