import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmListComponent } from './farms/farm-list/farm-list.component';
import { FarmInfoComponent } from './farms/farm-info/farm-info.component';
import { HomeComponent } from './home/home.component';
import { AgencyListComponent } from './agencies/agency-list/agency-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'farms', component: FarmListComponent },
    { path: 'farms/:id', component: FarmInfoComponent },
    { path: 'agencies', component: AgencyListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
