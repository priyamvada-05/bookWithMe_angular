import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  url:string;
  constructor(private authService: AuthService,
              private router: Router) {}


  handleIsAutherize():boolean{
  	if(this.isRedirectToLoginOrRegister()){
  		this.router.navigate(['/rental']);
  		return false;  		
  	}
  	return true;
  }

  handleNotAutherize():boolean{
  	if(this.isRedirectToLoginOrRegister()){
  		return true
  	}
  	this.router.navigate(['/auth/login']);
  }

  isRedirectToLoginOrRegister():boolean{
  	if( this.url.includes('login')  || this.url.includes('register')){
  		return true;
  	}
  	return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url= state.url;

    if(this.authService.isAutherise()){

    	return this.handleIsAutherize();
    }

    return this.handleNotAutherize();
  }
}
