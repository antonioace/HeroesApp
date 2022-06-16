import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const rutas: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
