import { Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http'

@Injectable()
export class MapService{

	constructor(private http: HttpClient){}

//      This is by using google geocode api to get latitude and longitude  -------------

	/*public getLocationFromGoogleMapApi(location: string): Observable<any>{

		const google_geo = new (<any>window).google.maps.Geocoder();
		return new Observable((observe)=>{

			google_geo.geocode({address:location}, (result, status)=>{
				if(status == 'OK'){
					const cord=result[0].geometry.location
					observe.next({lat: cord.lat(),
								  lng: cord.lng()
								});
				}
				else{
					observe.error('Location not getting on map');
				}
			})
		})

	}*/

	public getCordinateWithoutGoogleGeocode(location: string): Observable<any>{

		const address_url='https://nominatim.openstreetmap.org/search/' + location + '?format=json';
		console.log(address_url);
		return this.http.get(address_url);
			
	}
}