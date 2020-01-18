import { Component, OnInit, Input } from '@angular/core';
import { BookingModel} from '../../shared/booking.model';
import * as moment from 'moment';
import { Router} from '@angular/router';

@Component({
  selector: 'rental-user-detail',
  templateUrl: './rental-user-detail.component.html',
  styleUrls: ['./rental-user-detail.component.scss']
})

export class RentalUserDetailComponent implements OnInit {

@Input() itemBooking: BookingModel;
startAt:string;
endAt:string;
createdAt:string;
days:number;
rentalID:string;

  constructor( private router: Router) { }

  ngOnInit() {

  	this.startAt=moment(this.itemBooking.startAt).format('YYYY-MM-DD');
  	this.endAt=moment(this.itemBooking.endAt).format('YYYY-MM-DD');
  	this.createdAt=moment(this.itemBooking.createdAt).format('YYYY-MM-DD HH:mm:ss');
  	this.days=-moment(this.itemBooking.startAt).diff(this.itemBooking.endAt,'days');
    this.rentalID=this.itemBooking.rental._id;

  }

  goToRental(){

    this.router.navigate([`/rental/${this.rentalID}`])
  }

}
