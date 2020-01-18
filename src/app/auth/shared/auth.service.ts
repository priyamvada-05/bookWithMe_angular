import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/Rx';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';



@Injectable()
export class AuthService{

	private decodedToken:any={};
	private default:any={
		exp:0,
		username:''
	}

	jwt = new JwtHelperService();

	constructor( private http: HttpClient){

		//this.decodedToken=JSON.parse(localStorage.getItem('login_decodedtoken') || this.default);
	}

	private saveToken(data:object):object{
		this.decodedToken=this.jwt.decodeToken(data['token']);
		localStorage.setItem('login_token', data['token']);
		localStorage.setItem('login_decodedtoken', JSON.stringify(this.decodedToken));
		return data;
	}

	public isAutherise():boolean{
		const data=JSON.parse(localStorage.getItem('login_decodedtoken'))
		if(data){
		return moment().isBefore(moment.unix(data.exp))
		}
		else{
			return false;
		}

	}

	private getUserDetails():object{
		
		return JSON.parse(localStorage.getItem('login_decodedtoken'))
	}

	public sendDataToMongoDB(userData):Observable<any>{
		return this.http.post('/api/v1/user/register', userData);

	}

	public loginValdationWithMongoDB(userData):Observable<any>{

		return this.http.post('/api/v1/user/login', userData).map(
			(token: object)=>{
				return this.saveToken(token)
			}
			)
	}
	
	public getToken():string{
		console.log('token');
		console.log(localStorage.getItem('login_token'));
		return localStorage.getItem('login_token');
	}


}