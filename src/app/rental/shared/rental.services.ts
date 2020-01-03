import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { RentalModel} from './rental.model';
import { HttpClient} from '@angular/common/http';

@Injectable()

export class RentalService{

    constructor(private http: HttpClient){

    }    

    public getRentalDataByID(ID: string): Observable<any>{
    	return  this.http.get('/api/v1/application/'+ ID);
    }

    public getRentalData() : Observable<any> {
        return this.http.get('/api/v1/application');
        }

}