import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signup: FormGroup;
  route: Router;
  errors: string;
  error: boolean;
  constructor(fb: FormBuilder, private auth: AuthenticationService, route: Router) {
    this.error = false;
    this.errors = '';
    this.route = route;
    this.signup = fb.group({
      'username': [null, Validators.required],
      'email': [null, Validators.compose([Validators.email, Validators.required])],
      'password1': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'password2': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }
  onSubmit(f: any) {
    this.auth.signup(f).subscribe(value => {
      if (value.user) {
        this.error = false;
        this.route.navigate(['/']);
      }
    }, err => {
      this.error = true;
      console.log(JSON.parse(err));
      if (JSON.parse(err).username != null) {
        this.errors = JSON.parse(err).username[0];
      }
      if (JSON.parse(err).email != null) {
        this.errors = this.errors + '\n' + JSON.parse(err).email[0];
      }
    });
  }
}
