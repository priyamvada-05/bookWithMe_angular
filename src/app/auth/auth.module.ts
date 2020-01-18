import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent} from './auth.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { AuthService} from './shared/auth.service';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuard} from './shared/auth.guard';
import { HTTP_INTERCEPTORS} from '@angular/common/http'
import { TokenInterceptor} from './shared/token.interceptor';

const route:Routes =[{
	path:'auth', 
	component:AuthComponent,
	children:[
		{path:'login', component:LoginComponent, canActivate:[AuthGuard]},
		{path: 'register', component: RegisterComponent, canActivate:[AuthGuard]}
	]
}]

@NgModule({
  declarations: [
  AuthComponent,
  LoginComponent,
  RegisterComponent
  ],
  
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers:[
  AuthService,
  AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }
  ],
  exports:[
  AuthComponent
  ]

})
export class AuthModule { }
