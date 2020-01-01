import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RentalModule} from './rental/rental.module';

import { HeaderComponent} from './common/header/header.component';
import { AppComponent } from './app.component';
import { RentalComponent} from './rental/rental.component';


const routes: Routes = [

{path: '', redirectTo: 'rental', pathMatch: 'full'},
//{path: 'temp', component: 'TempComponent'}

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    RentalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
