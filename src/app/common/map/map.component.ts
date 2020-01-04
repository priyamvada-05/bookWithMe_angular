import { Component, OnInit, Input } from '@angular/core';
import { MapService} from './map.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	latitude: number;
	longitude: number;

	@Input() location;

  constructor(private mapService: MapService) { }

  ngOnInit() {

  	 this.mapService.getCordinateWithoutGoogleGeocode(this.location).subscribe(
  		(data)=>{
  			this.latitude=Number(data[0].lat);
  			this.longitude=Number(data[0].lon);
  		}
  		)
  	

  }



  getLocationCordinate(): void{

  	/*this.mapService.getLocationFromGoogleMapApi(this.location).subscribe(
  		(data)=>{
  			this.latitude=data.lat;
  			this.longitude=data.lng;
  		}

  		)*/

  	
  }

}
