import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, CarouselModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import {HttpModule} from '@angular/http';
 import { NguiMapModule} from '@ngui/map';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

const myRoutes: Routes = [
{
  path: '', component: MainComponent
},
  {
    path: 'signup', component: SignupComponent
  }
  ,
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'logout', component: LogoutComponent
  }
  ,
  {
    path: 'profile', component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignupComponent,
    SigninComponent,
    LogoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot(myRoutes)
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
