import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmListComponent } from './farms/farm-list/farm-list.component';
import { FarmInfoComponent } from './farms/farm-info/farm-info.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'farms', component: FarmListComponent },
    { path: 'farms/:id', component: FarmInfoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
