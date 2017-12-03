import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import * as $ from 'Jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  token: string;
  lat: number;
  lon: number;
  muser: any;
  fullname: string;
  myform: FormGroup;
  route: Router;
  history: boolean;
  hospital: boolean;
  gps: boolean;
  firtsName: string;
  lastName: string;
  hospitals: string;
  hospitalName: string;
  getAddr: boolean;
  addr: string;
  addrVal: string;
  googleMap: any;
  currentLocationLat: number;
  currentLocationLon: number;
  news: string;
  email: string;
  
  constructor(fb: FormBuilder, private auth: AuthenticationService, route: Router) {
    this.route = route;
    this.history = true;
    this.hospital = false;
    this.gps = false;
    this.getAddr = false;
    this.addrVal = "Show Address";
    this.muser = localStorage.getItem('currentUser');
    this.muser = JSON.parse(this.muser);
    const cur = JSON.parse(localStorage.getItem('currentUser'));
    let detail = JSON.parse(localStorage.getItem('currentUserDetailed'));
    if (detail == null) {
      detail = cur.user;
    }
    this.email = detail.email;
    this.token = cur.token;
    if (detail.first_name) {
      this.firtsName = detail.first_name;
      this.lastName = detail.last_name;
      this.fullname = detail.first_name + ' ' + detail.last_name;
    } else {
      this.firtsName = '';
      this.lastName = '';
      this.fullname = 'Not set';
    }
    this.myform = fb.group({
      'first_name': this.firtsName,
      'last_name': this.lastName,
      'username': cur.user.username
    });
  }
  ngOnInit() {
    this.auth.getHospitals(this.token).subscribe(value => {
      this.hospitals = value.results;
    });

    this.auth.getNews(this.token).subscribe(value => {
      console.log(value);
      this.news = value.results;
    });
  }
  onSubmit(f: any) {
    this.auth.edit(f, this.token).subscribe(value => {
      window.location.reload();
    });
  }
  change(type: number) {
    if (type == 1) {
      this.hospital = true;
      this.history = false;
      this.gps = false;
    } else if(type == 2) {
      this.hospital = false;
      this.history = true;
      this.gps = false;
    } else if(type == 3) {
      this.hospital = false;
      this.history = false;
      this.gps = true;
    }
  }
  parseStringToFloat(str: string) {
    return parseFloat(str);
  } 
  sentLocation(locationData) {

    this.googleMap = null;
    this.hospitalName = locationData.name;
    this.addr = locationData.address;
    this.lat = this.parseStringToFloat(locationData.location.split(',')[0]);
    this.lon = this.parseStringToFloat(locationData.location.split(',')[1]);

    const uluru = {lat: this.lat, lng: this.lon};
        this.googleMap = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: uluru,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
       const marker = new google.maps.Marker({
            position: uluru,
            map: this.googleMap
          });
    this.change(3);
  }

  address() {
    this.getAddr = !this.getAddr;
    if(this.getAddr) {
      this.addrVal = "Hide Address";
    } else {
      this.addrVal = "Show Address";
    }
  }

  convertDate(date: string) {
     const dat = new Date(date);
     return dat.getFullYear()+"."+dat.getMonth()+"."+dat.getDate()+" "+dat.getHours()+":"+dat.getHours()+":"+dat.getSeconds();
  }
}
