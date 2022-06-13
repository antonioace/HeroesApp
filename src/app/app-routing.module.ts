import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routess: Routes = [
  {
    path: '404',
    component: ErrorComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routess)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
