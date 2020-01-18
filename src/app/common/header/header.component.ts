import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth/shared/auth.service';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	username:string;
	search:string;
	search1:string;
 
 	constructor( private authService:AuthService, private router:Router){
 	}

 	ngOnInit(){
		
 	}
 	
 	getLogout(){
 		localStorage.removeItem('login_token');
 		localStorage.removeItem('login_decodedtoken');

 		this.router.navigate(['/auth/login']);

 	}

 	resetSearch(){
 		this.search='';
 	}

 	navigateToSearchCity(){
 		console.log(`navigating to city ${this.search}`);
 		this.search1=this.search;
 		this.search='';
 		this.router.navigate([`/rentalSearch/${this.search1}`])
 	}

 	getRentalUser(){
 		this.router.navigate(['/rentalUser']);
 	}
}
