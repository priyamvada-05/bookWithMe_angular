import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AuthService} from '../shared/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	formVariable:any={};
	errors:any={};

  constructor(private authservice: AuthService, 
  			  private route: Router) { }

  ngOnInit() {
  }

  registerOnSubmit(data){
  	console.log(data.value);
  	this.authservice.sendDataToMongoDB(data.value).subscribe(
  		(data)=>{

  			this.route.navigate(['/auth/login',{registered:'ok'}]);
  				},
  		(err)=>{
  			console.log('This is error');
  			console.log(err);
  			this.errors=err.error.error;
  		}
  		)
  }

}
