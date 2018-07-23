import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FarmerOfferComponent } from './farmer-offer/farmer-offer.component';
import { AgencyPreferenceComponent } from './agency-preference/agency-preference.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'agency', component: AgencyPreferenceComponent },
  { path: 'farmer', component: FarmerOfferComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    FarmerOfferComponent,
    AgencyPreferenceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
