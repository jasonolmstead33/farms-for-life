import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FarmInfoComponent } from './farms/farm-info/farm-info.component';
import { FarmListComponent } from './farms/farm-list/farm-list.component';
import { AgencyInfoComponent } from './agencies/agency-info/agency-info.component';
import { AgencyListComponent } from './agencies/agency-list/agency-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FarmInfoComponent,
    FarmListComponent,
    AgencyInfoComponent,
    AgencyListComponent,
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,

    AppRoutingModule,
  ],
  providers: [],
  entryComponents: [FarmInfoComponent, AgencyInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
