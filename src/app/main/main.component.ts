import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  muser: string;
  constructor() {
    this.muser = localStorage.getItem('currentUser');
    this.muser = JSON.parse(this.muser)
    console.log(this.muser);
  }
}
