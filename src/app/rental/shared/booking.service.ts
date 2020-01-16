import { Injectable} from '@angular/core';
import * as moment from 'moment';
import { BookingModel} from './booking.model';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class BookingService{

 	constructor( private http: HttpClient){}

	public totalBookingDateRange(startDate, endDate) : Array<any>{

			    var dates = [];

			    var currDate = moment(startDate).startOf('day');
			    var lastDate = moment(endDate).startOf('day');

			    dates.push(currDate.clone().format('YYYY-MM-DD'));

			    while(currDate.add(1, 'days').diff(lastDate) <= 0) {
			        dates.push(currDate.clone().format('YYYY-MM-DD'));
			    }

			    return dates;
      }
		
	


	public createBookingInMongo(booking:BookingModel): Observable<any>{

		return this.http.post('/api/v1/booking', booking);

	}
}