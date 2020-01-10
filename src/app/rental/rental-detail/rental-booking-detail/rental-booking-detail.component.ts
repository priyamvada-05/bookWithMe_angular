import { Component, OnInit, Input } from '@angular/core';
import { RentalModel} from '../../shared/rental.model'

@Component({
  selector: 'rental-booking-detail',
  templateUrl: './rental-booking-detail.component.html',
  styleUrls: ['./rental-booking-detail.component.scss']
})
export class RentalBookingDetailComponent implements OnInit {

	@Input() rental:RentalModel;

  constructor() { }

  ngOnInit() {
  }

  public daterange: any = {};


  public options: any = {
        locale: { format: 'YYYY-MM-DD' },
        alwaysShowCalendars: false,
    };

  public selectedDate(value: any, datepicker?: any) {

        console.log(value);

        
        datepicker.start = value.start;
        datepicker.end = value.end;

        
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
        console.log(this.daterange);
    }
}