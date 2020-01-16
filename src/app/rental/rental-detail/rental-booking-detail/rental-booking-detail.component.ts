import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RentalModel} from '../../shared/rental.model'
import { BookingModel} from '../../shared/booking.model';
import { BookingService} from '../../shared/booking.service';
import * as moment from 'moment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';

@Component({
  selector: 'rental-booking-detail',
  templateUrl: './rental-booking-detail.component.html',
  styleUrls: ['./rental-booking-detail.component.scss']
})
export class RentalBookingDetailComponent implements OnInit {

	@Input() rental:RentalModel;
  @Input() booking: BookingModel[];

  @ViewChild(DaterangePickerComponent, {static: false})
  private picker: DaterangePickerComponent;

  form:FormGroup;
  daterange:any={};
  totalDatesBooking:Array<any>=[];
  guest:string;
  bookObj:BookingModel;
  errors:any={};


  public options: any = {
        locale: { format: 'YYYY-MM-DD' },
        alwaysShowCalendars: false,
        isInvalidDate: this.checkInvalidDate.bind(this),
        autoUpdateInput:false
   };

  constructor( private bookingService: BookingService,
               private modalService: NgbModal,
               private fb: FormBuilder,
               private toastmanager: ToastrService) {}

  ngOnInit() {

    this.getTotalDayofBooking();
    this.setForm();

  }

  setForm(){
    this.form= this.fb.group({
      guest:  ['', Validators.required]
    })

    console.log('this is form');
    console.log(this.form);
  }

  open(content) {
    this.errors={};
    this.modalService.open(content);
    this.resetDateRangepicker();
  }

  close() {
    this.modalService.dismissAll();
    this.bookObj=new BookingModel();
    this.guest=null;
  }

  public resetDateRangepicker() {
        this.picker.datePicker.setStartDate(moment());
        this.picker.datePicker.setEndDate(moment());
        this.picker.datePicker.element.val('');
    }

  getTotalDayofBooking(){

    if(this.booking && this.booking.length>0){

        this.booking.forEach((data)=>{
        const datesArray= this.bookingService.totalBookingDateRange(data.startAt, data.endAt);
        this.totalDatesBooking.push(...datesArray);

        })
    }

  }

  checkInvalidDate(date){
    return this.totalDatesBooking.includes(date.format('YYYY-MM-DD')) || date.diff(moment(), 'days')<0;
  }


  public selectedDate(value: any, datepicker?: any) {

        console.log('selected dates')
        
        this.daterange.start = value.start.format('YYYY-MM-DD');
        this.daterange.end = value.end.format('YYYY-MM-DD');

        const day= -value.start.diff( value.end, 'days');
        this.daterange.days=day;
        this.daterange.totalPrice= this.rental.dailyRate * this.daterange.days;
        console.log(this.daterange);
        this.options.autoUpdateInput= true;
    }

   Save(){

     this.bookObj=new BookingModel();  

     console.log(this.rental);
     this.bookObj.startAt= this.daterange.start;
     this.bookObj.endAt= this.daterange.end;
     this.bookObj.guest= Number(this.guest);
     this.bookObj.totalPrice= this.daterange.totalPrice;
     this.bookObj.days = this.daterange.days;
     this.bookObj.rental = this.rental;

     console.log(this.bookObj);

     this.bookingService.createBookingInMongo(this.bookObj).subscribe(
       (data)=>{
        console.log(data);
        const dates= this.bookingService.totalBookingDateRange(data.startAt, data.endAt);
        this.totalDatesBooking.push(...dates);
        this.close();
        this.toastmanager.success('Success! Booking is created');
       },
       (err)=>{
         
         this.errors=err.error.error;
         console.log(this.errors);
       })

     

   }
}
