import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth/shared/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	username:string;
 
 	constructor( private authService:AuthService, private router:Router){
 	}

 	ngOnInit(){
		
 	}
 	
 	getLogout(){
 		localStorage.removeItem('login_token');
 		localStorage.removeItem('login_decodedtoken');

 		this.router.navigate(['/auth/login']);

 	}
}
