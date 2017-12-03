import { Component } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  myform: FormGroup;
  route: Router;
  isUser: boolean;
  constructor(fb: FormBuilder, private auth: AuthenticationService, route: Router) {
    this.isUser = true;
    this.route = route;
    this.myform = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit(f: any) {
      this.auth.signin(f).subscribe(value => {
        console.log(this.isUser);
        if (value.user) {
          this.isUser = true;
          this.route.navigate(['/']);
        }
      }, err => {
        this.isUser = false;
      });
  }

}
