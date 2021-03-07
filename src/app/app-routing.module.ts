import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuthGuard} from './gaurds/auth.guard'
const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('src/app/modules/navigation/navigation.module').then(m => m.NavigationModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
