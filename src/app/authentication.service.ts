import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  signup(form: any) {
    return this.http.post('https://donor-production.herokuapp.com/api/signup/',
      form)
      .map((response: Response) => {
        const user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }).catch((error: Response | any) => {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${err}`;
        }else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
      });
  }
  signin(form: any) {
    return this.http.post('https://donor-production.herokuapp.com/api/login/', form)
      .map((response: Response) => {
        const user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user || {};
      }).catch((error: Response | any) => {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${err}`;
        }else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
      });
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserDetailed');
  }
  edit(form: any, token: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'JWT ' + token);
    const options = new RequestOptions({headers: headers});
    return this.http.put('https://donor-production.herokuapp.com/api/user/',
      form,
      options
    )
      .map((response: Response) => {
        localStorage.removeItem('currentUserDetailed');
        const user = response.json();
        if (user) {
          localStorage.setItem('currentUserDetailed', JSON.stringify(user));
        }
        return user;
      });
  }

  getHospitals(token: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'JWT ' + token);
    const options = new RequestOptions({headers: headers});
    return this.http.get('https://donor-production.herokuapp.com/api/hospitals/',
      options
    )
      .map((response: Response) => {
        const hospitals = response.json();
        return hospitals;
      });
  }

  getNews(token: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'JWT ' + token);
    const options = new RequestOptions({headers: headers});
    return this.http.get('https://donor-production.herokuapp.com/api/announcements/',
      options
    )
      .map((response: Response) => {
        const hospitals = response.json();
        return hospitals;
      });
  }
}
