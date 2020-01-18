import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RentalService} from '../../shared/rental.services';
import { RentalModel} from '../../shared/rental.model';

@Component({
  selector: 'serach',
  templateUrl: './serach.component.html',
  styleUrls: ['./serach.component.scss']
})
export class SerachComponent implements OnInit {

  city:string;
  rentals:RentalModel[];
  errors:any;

  constructor( private route: ActivatedRoute,
  				private rentalService: RentalService) { }

  ngOnInit() {

  	this.route.params.subscribe(
          		(data)=>{
                console.log('this is inside Search component');
          			this.city=data.rentalSearchCity;
                console.log(this.city);
                this.getRentalByCity();
          	},
          	(err)=>{
          		console.log(err);
          	}
          	);

    

  }

  getRentalByCity(){
  	this.rentalService.getRentalBySearchCity(this.city).subscribe(
  		(data)=>{
  			this.rentals=data;
        console.log('this is data')
        console.log(this.rentals);
  		},
  		(err)=>{
        console.log('this is error')
        console.log(err)
  			this.errors=err.error;
        this.rentals=[];
  		})
  }

}
