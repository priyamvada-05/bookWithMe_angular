import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService} from '../shared/auth.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form:FormGroup;
  loginData:any={};
  errorRes:any={};
  status:string=''

  constructor(private fb: FormBuilder, 
              private authSerice: AuthService,
              private route:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.setForm();
  	this.activatedRoute.params.subscribe(
      (data)=>{
        this.status=data.registered;
        console.log(this.status)
      }
      )
  }

  setForm(){

  	this.form=this.fb.group({
  		email:['', [Validators.required, 
  		Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
  		password:['', Validators.required]
  	})
  }

   onSubmit(){
     this.loginData.email=this.form.controls.email.value;
     this.loginData.password=this.form.controls.password.value;

   this.authSerice.loginValdationWithMongoDB(this.loginData).subscribe(
     (token)=>{
       console.log('This is login ok');
       console.log(token);
       this.route.navigate(['/rental']);
     },
     (err)=>{
       console.log('This is error');
       this.errorRes=err.error.error;
       console.log(err);
       console.log(this.errorRes);
     }
     )

  }

}
