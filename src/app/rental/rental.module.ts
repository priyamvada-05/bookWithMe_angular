import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent} from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalService} from './shared/rental.services';
import { Routes, RouterModule} from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule} from '@angular/common/http';
import { MapModule} from '../common/map/map.module';
import { AuthGuard} from '../auth/shared/auth.guard';
import { RentalBookingDetailComponent } from './rental-detail/rental-booking-detail/rental-booking-detail.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { BookingService} from './shared/booking.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptor} from '../auth/shared/token.interceptor';

const routes: Routes=[
{path:'rental', 
component: RentalComponent,
children: [
{ path: '', component: RentalListComponent, canActivate:[AuthGuard]},
{ path: ':rental_ID', component: RentalDetailComponent, canActivate:[AuthGuard]}
]
}

]

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    RentalBookingDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
  ],

  providers: [
  RentalService,
  AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
  BookingService]
})
export class RentalModule {
//console.log('Hi this is rental Module');
 }
