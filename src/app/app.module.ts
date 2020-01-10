import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RentalModule} from './rental/rental.module';

import { HeaderComponent} from './common/header/header.component';
import { AppComponent } from './app.component';
import { AuthModule} from './auth/auth.module';

const routes: Routes = [
{path: '', redirectTo: 'rental', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    RentalModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
