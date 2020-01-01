import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RentalService} from '../shared/rental.services';
import { RentalModel} from '../shared/rental.model';

@Component({
  selector: 'rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

	 current_id:number;
	 rental_Detail:RentalModel;

  constructor( private route: ActivatedRoute, private rentalservice: RentalService) { }

  ngOnInit() {

  this.route.params.subscribe(
  		(data)=>{
  		this.current_id=Number(data.rental_ID);
  	},
  	(err)=>console.log(err)
  	);

  this.rentalservice.getRentalDataByID(this.current_id).subscribe(
  		(data)=>{
  			this.rental_Detail=data;
  			console.log('This is inside ngOnInit getRentalDataByID() calling function');
  			console.log(this.rental_Detail);
  		},
  		(err)=>{console.log(err)}
  		);

  console.log(this.current_id);
  console.log(this.rental_Detail)
  }


}
