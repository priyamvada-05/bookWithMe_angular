import { Component, OnInit } from '@angular/core';
import { BookingModel} from '../shared/booking.model';
import { BookingService} from '../shared/booking.service';
import { Router} from '@angular/router';

@Component({
  selector: 'rental-uesr',
  templateUrl: './rental-uesr.component.html',
  styleUrls: ['./rental-uesr.component.scss']
})
export class RentalUesrComponent implements OnInit {

  booking:BookingModel[];
  error:any;

  constructor( private bookingService: BookingService,
                private router: Router) { }

  ngOnInit() {

  	this.getUserBooking()
  }

  getUserBooking(){
  	this.bookingService.getUserBookingFromMongoDB().subscribe(
  		(data)=>{
  			this.booking=data;
  			console.log('user booking');
  			console.log(this.booking);
  		},
  		(err)=>{
        console.log('this is error');
  			console.log(err);
        this.error=err.error;
  		})
  }

  goToRental(){

    this.router.navigate(['/rental'])

  }
}
