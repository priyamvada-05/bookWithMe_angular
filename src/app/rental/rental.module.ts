import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent} from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalService} from './shared/rental.services';
import { Routes, RouterModule} from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule} from '@angular/common/http';
import { CustomPipe} from '../common/pipes-custom/common_pipes';

const routes: Routes=[
{path:'rental', 
component: RentalComponent,
children: [
{ path: '', component: RentalListComponent},
{ path: ':rental_ID', component: RentalDetailComponent}
]
}

]

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    CustomPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],

  providers: [RentalService]
})
export class RentalModule {
//console.log('Hi this is rental Module');
 }
