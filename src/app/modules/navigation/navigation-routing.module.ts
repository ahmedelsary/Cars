import { CustomersComponent } from './components/customers/customers.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisitComponent } from './components/visit/visit.component';

const routes: Routes = [
  {
    path: "",
    component: NavComponent,
    children:[

      {
        path: "dashboard",
        component: DashboardComponent
      },

      {
        path: "visit",
        component: VisitComponent
      },
      {
        path: "purchase",
        component: PurchaseComponent
      },
      {
        path: "customers",
        component: CustomersComponent
      },

    ]
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
