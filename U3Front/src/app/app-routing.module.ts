import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SigninComponent } from './components/seguridad/signin/signin.component';
import { SignupComponent } from './components/seguridad/signup/signup.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'perfil', component: PerfilComponent },
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'añadir-libro', component: FormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
