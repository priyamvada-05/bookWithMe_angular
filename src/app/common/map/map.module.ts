import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent} from './map.component';
import { AgmCoreModule} from '@agm/core';
import { MapService} from './map.service';
import {HttpClientModule} from '@angular/common/http';
import { CustomPipe} from '../pipes-custom/common_pipes';

@NgModule({
  declarations: [
  MapComponent,
  CustomPipe
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
    	apiKey:'AIzaSyBiOoO4gnP_HVHSS7SFMNS_zg8VX2ZiZC4'
    }),
    HttpClientModule
  ],
  exports:[
  MapComponent,
  CustomPipe
  ],
  providers:[
  MapService
  ]
})
export class MapModule { }
