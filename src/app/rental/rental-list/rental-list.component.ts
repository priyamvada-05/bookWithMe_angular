import { Component, OnInit } from '@angular/core';
import {RentalService} from '../shared/rental.services';
import { RentalModel} from '../shared/rental.model';


@Component({
  selector: 'rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

	rentals: RentalModel[] = [];

  constructor(private rentalservice: RentalService) { 

  }

  ngOnInit() {

    this.rentalservice.getRentalData().subscribe(
      (rental_data)=>{
        this.rentals=rental_data;
      },

      (err)=>{

      }

      )
    

  }

}
