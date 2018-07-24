import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmListComponent } from './farms/farm-list/farm-list.component';
import { FarmInfoComponent } from './farms/farm-info/farm-info.component';
import { AgencyListComponent } from './agencies/agency-list/agency-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/orders', pathMatch: 'full' },
    { path: 'farms', component: FarmListComponent },
    { path: 'agencies', component: AgencyListComponent },
    { path: 'orders', component: OrdersListComponent },
    // { path: 'orders/:id', component: OrdersListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
