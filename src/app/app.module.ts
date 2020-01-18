import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RentalModule} from './rental/rental.module';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthModule} from './auth/auth.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent} from './common/header/header.component';

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
    AuthModule,
    NgbModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
