import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  route: Router;
  constructor(private auth: AuthenticationService, route: Router) {
    this.route = route;
  }
  ngOnInit() {
    this.auth.logout();
    this.route.navigate(['/']);
  }
}
