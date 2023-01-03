import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasgboardComponent } from './dasgboard/dasgboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranscationComponent } from './transcation/transcation.component';

const routes: Routes = [
  //login path-DashboardComponent
{
  path:'',component:LoginComponent
},
//dashboard path
{
  path:'dashboard',component:DasgboardComponent
},
//register
{
  path:'register',component:RegisterComponent
},
{
  path:'transcation',component:TranscationComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
